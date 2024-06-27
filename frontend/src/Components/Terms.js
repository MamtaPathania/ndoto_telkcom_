
import React from 'react'
import { Link, useParams } from 'react-router-dom';

const Terms = () => {
const params=useParams()

const {ani,beautyparam}=params
  const appTitle = document.title;

  return (
    <div className='bg-[#0a0b0c] h-[1600px] text-gray-300'  >
      <Link to={`/redirect/${beautyparam}?msisdn=${ani}&result=active`} >
      <h1 className='py-5 mx-10 text-2xl text-red-700'  style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}> Back To Home</h1>
      </Link>
      <div className='max-h-[1000px] overflow-y-auto'>
        <h1 className='text-red-700 text-3xl font-medium py-3 flex justify-center sticky top-0 bg-[#0a0b0c] z-10'>
          Terms and Conditions of Use</h1>
        <p className="mb-3  text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          Ndoto Media is the provider of the "{appTitle}" platform, in its various formats accessible via mobile and desktop/laptop devices. "{appTitle}" is a platform that hosts various content services that can be accessed individually by customers based on a customer choosing to subscriber to "{appTitle}" ("Service(s)"). The terms of this agreement ("Terms and Conditions") govern the relationship between you and Ndoto Media and its affiliates) (hereinafter ""{appTitle}"" or "Us" or "We") regarding your use of "{appTitle}" and related Services on "{appTitle}". Use of "{appTitle}" is also governed by Privacy Policy which is incorporated herein by reference.</p>


        <p className="mb-3 font-normal text-justify mx-10 text-gray-300 dark:text-gray-400">
          WASPA is a non-profit body, founded in 2004, which represents the interests of mobile application service providers operating in South Africa. WASPA provides a neutral forum for members to address issues of common interest and interact with industry stakeholders, network operators and government bodies.</p>


        <h1 className='text-red-600 text-xl mx-10 mt-9'>

          Your acceptance of these Terms and Conditions :

        </h1>
        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          Please read these Terms and Conditions and the Privacy Policy carefully before using "{appTitle}" and/or any of the services therein. By using "{appTitle}" and/or any of Services therein or submitting information on "{appTitle}", you are agreeing to these Terms and Conditions. If you do not accept these Terms and Conditions, please do not use "{appTitle}" or any Services therein.</p>
        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          We reserve the right, at any time, to modify and update these Terms and Conditions by posting such updated Terms and Conditions on Ndoto Media and "{appTitle}" website. Any such updates shall apply to you and your use of "{appTitle}" and the Services therein.By continuing to use "{appTitle}", you shall be deemed to have accepted such changes. </p>

        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">


          You can access "{appTitle}" on URL: https://games.ndotomedia.com or on the Ndoto Media website under the services banner to access "{appTitle}". To access and use the "{appTitle}" you must be 13 (Thirteen) years of age or older.
        </p>
        <p className="mb-3 mt-4  text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          Once registered to use "{appTitle}", you give us consent to provide you with various notifications and messages about / based on your interaction with the Service. These notifications will be delivered to you in the form of text messages. These messages include, but are not limited to:
          <ul className='mt-5 text-justify' >
            <li>1. Periodic messages to encourage you to browse or access Services on "{appTitle}", or inform you of various features, new or existing</li>
            <li className='mt-3 text-justify'>2. Messages inviting you to try alternate versions of the Service based on our knowledge of the device you are using to access "{appTitle}"</li>
          </ul>



          <p className="mb-3 mt-4 text-justify font-normal mx-5 text-gray-300 dark:text-gray-400">

            Confirmation messages relating to your registration or deregistration for the Service, and/or when you purchase / subscribe / unsubscribe to any premium services available on the Service.
            We grant you permission to use "{appTitle}" and its Services, in accordance with these Terms and Conditions, provided that:
            your use of "{appTitle}" is only for your personal, non-commercial purposes.
            you do not copy or distribute any part of "{appTitle}" in any medium.
            you do not modify or reverse engineer any part of "{appTitle}"; and
            you comply with these Terms and Conditions.
          </p></p>

        <p className="mb-3 mt-4  text-justify  font-normal mx-10 text-gray-300 dark:text-gray-400">

          Ndoto Media is a member of WASPA and is bound by the WASPA Code of Conduct. Customers have the right to approach WASPA to lodge a complaint in accordance with the WASPA complaints procedure. Ndoto Media may be required to share information relating to a service or a customer with WASPA for the purpose of resolving a complaint. WASPA web site: www.waspa.org.za "{appTitle}" is a subscription service charged at R3/day. By using the service you agree that you are 18 years or older and have the bill payers permission. Compatible handsets only. To unsubscribe dial USSD *179#. For help call +27 (63) 686-7331. By using the service you agree to receive promotional material relating to this and similar services. To opt-out of marketing dial USSD *179#. Service provided by NdotoMedia, Fernbrook Estate 20 Brookside Crescent Inchanga Road , Maroeladal 2191.

          <p className="mb-3 text-justify mt-4 font-normal mx-5 text-gray-300 dark:text-gray-400">

            This service must not be used:

            <ul className='py-2'>
              <li className='py-2 '>
                1. To intentionally engage in illegal conduct.

              </li>

              <li className='py-2'>

                2. To  knowingly create, store or disseminate any illegal content.

              </li>

              <li className='py-2'>
                3. To  knowingly infringe copyright.

              </li>

              <li className='py-2'>
                4. To  knowingly infringe any intellectual property rights

              </li>

              <li className='py-2'>
                5. To  send spam or promote the sending of spam.

              </li>
            </ul>
          </p>

          <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

            We have the right to suspend or terminate the services of  any  customer who does not comply with these terms and conditions or any other related contractual obligations, and we have right to take down any content (hosted as part of the service) that it considers illegal or for which it has received a take-down notice.</p>
          <p className="mb-3 mt-4 font-normal mx-10 text-gray-300 dark:text-gray-400">

            You may not use, store, display, publish, transmit, distribute, modify, reproduce, create derivative works of or in any way exploit "{appTitle}", in whole or in part, outside of the specific usage rights granted to you by Ndoto Media.</p>

          <p className="mb-3 mt-4 font-normal mx-10 text-gray-300 dark:text-gray-400">

            We may change, suspend or discontinue all or any aspect of "{appTitle}" at any time, including the availability of any specific features. In such event, we shall not be required to provide benefits or other compensation to Subscribers in connection with such discontinued live, or any discontinued parts thereof.
            You acknowledge that from time to time, "{appTitle}"'s availability may be limited due to maintenance, upgrade or other technical reasons as relevant.</p>
          <p className="mb-3 mt-4 font-normal mx-10 text-gray-300 dark:text-gray-400">

            To the extent allowed by law, "{appTitle}" is provided on an "as is" and "as available" basis for your use, without warranties of any kind, express or implied. We do not warrant that you will be able to access or use "{appTitle}" on any device, or any time or location, or that "{appTitle}" will be uninterrupted or error-free. You agree that we will not be liable to you or to any third party for any unavailability, modification, suspension or withdrawal of any Content, or any features, part of or Content of "{appTitle}" or failure to make available any advertised Content title or to do so at the advertised time.</p>
          <p className="mb-3 mt-4 font-normal mx-10 text-gray-300 dark:text-gray-400">

            You acknowledge that we may appoint third party companies and individuals to facilitate the provision of "{appTitle}". These third parties have limited access to your information only to the extent necessary for the performance of "{appTitle}" and not to disclose or use it for other purposes.
          </p>
          <p className="mb-3 mt-4 font-normal mx-10 text-gray-300 dark:text-gray-400">

            These Terms and Conditions apply to all users of "{appTitle}" and the Services therein, including users who are also contributors of information, and other materials or "{appTitle}". "{appTitle}" may also contain third party advertisements, content, materials, and/or links to third party websites that are not owned or controlled by us. We assume no responsibility for, the content, privacy policies or practices of any third party websites. By using our "{appTitle}", you expressly release us from any and all liability arising from your use of any third party website or as a result of any third party presence on our "{appTitle}".</p>
          <p className="mb-3 mt-4 font-normal mx-10 text-gray-300 dark:text-gray-400">

            You agree to use the "{appTitle}" in good "{appTitle}" and in accordance with all applicable laws. Refraining from using the "{appTitle}" for illegal purposes, or in a manner that is contrary to any applicable laws, harms the rights and/or interests of others, or in any way damages, disables Terms, or overburdens or impairs "{appTitle}".
            You shall abstain from obtaining or attempting to obtain information, messages, graphics, pictures, sound files and / or images, photographs, recordings, software and generally any kind of material accessible using means or other than that which the "{appTitle}" provides.</p>

        </p>

        <h1 className='text-red-600 text-xl mx-10 mt-9'>
          Fees and Payment Terms

        </h1>
        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          You acknowledge and accept that a Service(s) require payment on a once-off or subscription basis, as applicable.
          Depending on the chosen payment option for the Service(s) you may be billed ad-hoc, daily, weekly, or monthly for specific Service(s) that you register/subscribe to for "{appTitle}". Subscription and usage is voluntary and occurs via the Service. The charges for the Services is subject to change, at Ndoto Media's, or the relevant third party content owner's discretion. Any changes therein will be communicated to subscribers with reasonable notice and you will be afforded the option to unsubscribe.</p>
        <p className="mb-3 mt-4  text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          Payments for the Service(s) will be levied against the payment method of your choice on the Service.
          When paying via your mobile telephone bill, the charge will be taken from your prepaid airtime balance (for TopUp and prepaid users), or added to your account (for postpaid users).
          No refunds will be allocated for partial use of the Service
          You will always be advised of the fees payable for the Service and you must first accept the cost prior to subscribing.
        </p>
        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          When using games content, you acknowledge that the quality of the playback of the content may vary from device to device, and may be affected by a variety of factors, such as your location, the bandwidth available through and/or speed of your Internet connection. Not all content is available in all formats. You are responsible for all Internet access charges.</p>

        <h1 className='text-red-600 text-xl mx-10 mt-9'>

          Limitation of Liability
        </h1>

        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          You agree that your use of "{appTitle}" and its Services is at your sole risk. To the fullest extent permitted by law, we and our officers, directors, employees, and agents disclaim all warranties, express or implied, in connection with "{appTitle}" and your use thereof. We make no warranties or representations about the accuracy or completeness of "{appTitle}" Services content or the content of any websites or Service linked to "{appTitle}" and assume no liability or responsibility for any:</p>

        <ul className='mx-10 text-justify'>
          <li  >
            1.  Errors, mistakes, or inaccuracies of content.
          </li>
          <li>2. Personal injury or property damage of any nature whatsoever resulting from your access to and use of "{appTitle}" or its Services</li>
          <li>
            3.  Any unauthorized access to or use of our servers and/or any and all personal information and/or financial information stored therein.
          </li>
          4. Any interruption or cessation of transmission to or from "{appTitle}".
          <li></li>
          <li>
            5. Any bugs, viruses, trojan horses or the like which may be transmitted to or through "{appTitle}" by any third party; or
          </li>
          <li>6.
            Any errors or omissions in any content or for any loss or damage of any kind incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available via "{appTitle}".
          </li>
        </ul>



        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          We do not warrant, endorse, guarantee, or assume responsibility for any product or "{appTitle}" advertised or offered by a third party through "{appTitle}" or any hyperlinked website or featured in any banner or other advertising, and we will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or "{appTitle}".</p>
        <p className="mb-3 mt-4  text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          To the extent permitted by applicable law, in no event shall we or our subsidiaries and affiliates, and their respective officers, directors, owners, agents, employees, representatives and licensors be liable for any special, incidental, indirect, consequential, punitive or exemplary losses or damages whatsoever or for loss of profits (including, without limitation, damages for loss of revenue, loss of data, failure to realize expected savings, interruption of activities, or any other pecuniary or economic loss) and whether arising from breach of contract, damages (including negligence), strict liability or otherwise, arising out of the use of or inability to use "{appTitle}" or its content, or any Service described or provided through the "{appTitle}".
          <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">
          </p>
          Save to the extent permitted by law, you agree to indemnify, defend and hold harmless Ndoto Media from and against any and all claims, demands, actions, liability, losses, costs and expenses (including legal fees and expenses) arising from or related to:</p>
        <ul className='mx-10 text-justify'>
          <li>
            1.Any use or alleged use of the "{appTitle}" by any other person, whether or not authorized by you

          </li>
          <li>
            2.Your breach of these Terms and Conditions, including any breach of your representations and warranties herein. and your violation of any law.

          </li>
          <li>
            3.Your use of or inability to use the "{appTitle}", the contents, any hyperlinked website, and any of the Services made available on "{appTitle}".

          </li>
        </ul>

        <h1 className='text-red-600 text-xl mx-10 mt-9'>

          Privacy and data protection</h1>
        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          For the purpose of "{appTitle}" we will collect information on your MSISDN, name and preferences. This information will be shared with Genrosys Technologies (Pty) Ltd, our appointed service provider for "{appTitle}" and maybe transferred across the border in order to enable the provision of "{appTitle}" and its various Services. The Ndoto Media's Privacy Policy shall apply in addition to these terms and conditions.
          List of Services currently on "{appTitle}" and that may be subscribed to individually and are subject to additional terms and conditions that are available on "{appTitle}" as part of the Service registration/subscription process.</p>


        <p className="mb-3 mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          Games on Demand Service
          This is a recurring daily, weekly or monthly subscription to games channels whereby a consumer can play unlimited games content per channel.
          In the event that Ndoto Media is unable to bill for the full subscription fee for this Service, Ndoto Media will implement micro-billing. Micro billing occurs when a user that is subscribed or subscribing to the Service does not have sufficient funds in their account (airtime balance) to pay for the service. Micro-billing will allow for Ndoto Media to charge a discounted subscription in the event that the user's airtime balance is less than the subscription fee.</p>

        <h1 className='text-red-600 text-xl mx-10 mt-9'>

          How to opt-out</h1>
        <p className="mb-3  mt-4 text-justify font-normal mx-10 text-gray-300 dark:text-gray-400">

          If you want to opt out of Services on "{appTitle}", you can dial *135*997# to manage all your content services.
          Please note you may not opt out of system messages sent to the customer when subscribing, cancelling the live or receiving renewal notifications of their next billing cycle.




        </p>
      </div>
    </div>

  )
}

export default Terms
