<script>
  import { base } from '$app/paths'
</script>
<div class="lg:ml-0 ml-5">

  <h1 class="text-3xl">UIUC Setup</h1>
  
  <ol class="list-decimal">
    <li class="m-5">Go to <a href="https://verify.uillinois.edu/" class="text-blue-700 hover:text-purple-700">UI Verify</a></li>
    <li class="m-5">Click 'Reactivate Duo App'</li>
    <img src="{base}/duo_activate.png" alt="" width="300">
    <li class="m-5">Send yourself an activation link email</li>
    <img src="{base}/activate_link.png" alt="" width="300">
    <li class="m-5">Copy the link in the email, and paste it into the <a href="/duo-bypass" class="text-blue-700 hover:text-purple-700">main page</a>.</li>
    <img src="{base}/paste_link.png" alt="" width="300">
    <li class="m-5">Finally, scan the QR code into Google Authenticator.</li>
    <img src="{base}/qrcode.png" alt="" width="300">
  </ol>
</div>