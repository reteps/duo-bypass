<script lang="ts">
  import { base } from '$app/paths'
  import { QRious } from '@phippsytech/svelte-qrious'
  // const { QRious } = pkg;
  import base32Encode from 'base32-encode'
  import { Buffer } from 'buffer';
  let url = '';
  let error = ''
  $: otpauth = ''
  $: customer_name = ''
  $: hotp_secret = ''

  const cors = 'https://proxy.cors.sh'
  const postToDuo = async (host: string, key: string) => {
    const postUrl = `${cors}/https://api-${host}.duosecurity.com/push/v2/activation/${key}?customer_protocol=1`
    return fetch(postUrl, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin': 'https://m-duo.duosecurity.com'
        },
        body: new URLSearchParams({
          'jailbroken': 'false',
          'architecture': 'arm64',
          'region': 'US',
          'app_id': 'com.duosecurity.duomobile',
          'full_disk_encryption': 'true',
          'passcode_status': 'true',
          'platform': 'Android',
          'app_version': '3.49.0',
          'app_build_number': '323001',
          'version': '11',
          'manufacturer': 'unknown',
          'language': 'en',
          'model': 'Pixel 3a',
          'security_patch_level': '2021-02-01'
        })
      })
      .then((resp) => resp.json())
  }

  const submit = async () => {
    if (!url) {
      error = 'Please enter a URL'
      return
    }
    const match = url.match(/https:\/\/m-(\w+).duosecurity.com.*\/(\w+)/)
    if (!match || match.length < 3) {
      error = 'Invalid URL, must be a Duo URL (https://*.duosecurity.com/...)'
      return
    }
    const host = match[1]
    const key = match[2]
    const resp = await postToDuo(host, key)
    if (resp.stat !== 'OK') {
      error = resp.message
      return
    }
    customer_name = resp.response.customer_name
    hotp_secret = base32Encode(Buffer.from(resp.response.hotp_secret, 'utf-8'), 'RFC3548', {padding: false})
    error = ''
    otpauth = `otpauth://hotp/${customer_name.replace(/ /g, '%20')}?secret=${hotp_secret}&digits=6&algorithm=SHA1&counter=0`
  }
</script>
<div class="flex flex-col lg:ml-0 ml-5">
  <h1 class="text-3xl">DuoBypass</h1>
  <p>This site allows you to use Duo codes with Google Authenticator instead of in the Duo App.</p>
  <p>Visit the <a href="{base}/setup" class="text-blue-700 hover:text-purple-700">setup</a> to get started. View the <a href="https://github.com/reteps/duo-bypass" class="text-blue-700 hover:text-purple-700">Source Code</a>.</p>
  <div class="flex flex-col items-center mt-10 lg:mx-0 mx-10">
    <div class="lg:w-1/2 w-full border-gray-500 border-2 rounded-lg">
      <div class="p-5 flex flex-col">
        {#if otpauth}
        <div class="text-green-600">Success! Scan the QR code below with Google Authenticator.</div>
        <QRious value={otpauth} size=300 />
        <div class="text-gray-600">If you don't have Google Authenticator, you can use these values:</div>
        <div class="text-gray-600 break-words">Secret: {hotp_secret}</div>
        <div class="text-gray-600">Issuer: {customer_name}</div>
        {:else}
        <input type="text" placeholder="Duo URL" class="border-gray-200 border-2 rounded-md w-full p-2" bind:value={url}>
        <div class="text-red-600">{error}</div>
        <div class="flex justify-end">
          <button class="bg-blue-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-5" on:click={submit}>Submit</button>
        </div>        
        {/if}
      </div>
    </div>
  </div>
</div>