import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Image } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';

export default class TermAndConditions extends Component {

    constructor(props) {
        super(props);

        this.termAndConditonsData = `LAST UPDATED: December 05, 2018

PLEASE READ THESE TERMS OF SERVICE CAREFULLY. THESE TERMS INCLUDE A MANDATORY ARBITRATION PROVISION AND CLASS ACTION WAIVER PROVISION, WHICH AFFECT YOUR RIGHTS ABOUT HOW TO RESOLVE ANY DISPUTE WITH ISHAANVI, INC. BY ACCESSING OR USING OUR WEBSITE, APPLICATIONS OR OTHER PRODUCTS OR SERVICES (TOGETHER, THE “ISHAANVI SERVICE”), YOU AGREE TO BE BOUND BY ALL TERMS DESCRIBED HEREIN AND ALL TERMS INCORPORATED BY REFERENCE (“TERMS”). IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE THE ISHAANVI SERVICE.

YOU ACKNOWLEDGE AND AGREE THAT THERE ARE RISKS ASSOCIATED WITH UTILIZING AN INTERNET-BASED MARKETPLACE AND INTERACTING WITH OTHER USERS IN PERSON AS OUTLINED IN SECTION 17.

These Terms apply to your access to and use of the Ishaanvi Service provided by Ishaanvi, Inc. (“Ishaanvi,” “we” and “us”). Additional terms (including, but not limited to, the terms of social media services, third-party payment processors, and third-party fulfillment providers) may apply to particular functionalities and features related to the Ishaanvi Service.

Note: From time to time Ishaanvi introduces new features that may only be available to certain users. Provisions of these Terms of Service relating to such new features, including, at the present, the electronic payments and fulfillment solutions, may not apply to all users.

1. Eligibility
ONLY USERS WHO ARE THIRTEEN (13) YEARS OF AGE OR OLDER MAY REGISTER FOR OR USE THE ISHAANVI SERVICE. The Ishaanvi Service is not targeted towards, nor intended for use by, anyone under the age of thirteen (13). If you are between the ages of thirteen (13) and eighteen (18), it is directed to use the Ishaanvi Service only under the supervision of a parent or legal guardian who agrees to be bound by these Terms and any applicable additional terms. You further represent and warrant that you: (a) have not previously been suspended or removed from using the Ishaanvi Service; (b) are legally permitted to, and do, live in the India or one of its territories, and (c) may enter into this agreement without violating any other agreement to which you are a party. If you are registering to use the Ishaanvi Service on behalf of a legal entity, you further represent and warrant that (i) such legal entity is duly organized and validly existing under the applicable laws of the jurisdiction of its organization, and (ii) you are duly authorized by such legal entity to act on its behalf.

2. Account Registration and Security Responsibilities
In order to access certain parts of the Ishaanvi Service, you may be required to create an Ishaanvi account (an “Account”), you must provide certain information (“Registration Data”) and answer all questions or fields marked “required.” You agree to: (a) provide true, accurate, current and complete Registration Data; (b) maintain and update such Registration Data to keep it true, accurate, current and complete; (c) maintain the security of your Account and the Stripe Account, including by maintaining the security and confidentiality of your login credentials; and (d) consent to allow Ishaanvi to contact you for the purpose of confirming some or all of your Registration Data, to conduct research and to resolve disputes, as Ishaanvi may elect to do from time to time.

3. Purchases From Other Users.
A. Cash and Other Payments determined by Users. A buyer may, by agreement with the seller, elect to make payment by cash, check or other payment method accepted by the seller. Such payments are made directly between the buyer and the seller when they meet in person to complete their purchase and sale transaction, pursuant to terms they determine. Ishaanvi is not a party to such transactions, and does not facilitate such transactions, refunds or returns in any manner.

B. Ishaanvi Payment Solution. 
A buyer and seller may instead pay with and accept credit cards and other electronic payment methods (each an “Electronic Payment Method”) through the Ishaanvi Service. Ishaanvi has integrated with Stripe, a payment processing service, to allow sellers to accept certain Electronic Payment Methods from buyers using Stripe’s payment processing services (“Ishaanvi Payment Solution”). Buyers who wish to use the Ishaanvi Payment Solution must register an Electronic Payment Method with Ishaanvi, and sellers must enroll for the service through Stripe. Enrollment in and usage of the Ishaanvi Payment Solution is voluntary, so buyers should note that some sellers may not accept Electronic Payment Methods, or may only accept Electronic Payment Methods for certain transactions. Ishaanvi, in its sole discretion, may from time to time impose limits on your ability to make and/or receive payments through the Ishaanvi Payment Solution. Additionally, Stripe may impose its own limits and limitations on a seller’s use of the Ishaanvi Payment Solution. For instance, a seller’s enrollment in the Ishaanvi Payment Solution is subject to Stripe’s confirmation that the seller meets Stripe’s enrollment criteria. Sellers should refer to Section 2(d) below for information about the impact of failing to meet Stripe’s enrollment criteria.

i. Buyers.
As with any purchases made using cash, all purchases made using the Ishaanvi Payment Solution are made directly between the buyer and the seller when they complete their purchase and sale transaction, pursuant to the terms they determine. When you initiate a payment through the Ishaanvi Payment Solution, the seller processes your Electronic Payment Method using Stripe’s payment processing service. Ishaanvi is not a party to purchase and sale transactions completed using the Ishaanvi Payment Solution, and disclaims any and all responsibility to facilitate such transactions, except to provide an interface through which you can provide your Electronic Payment Method to Stripe to process on behalf of the seller. Ishaanvi further disclaims any and all responsibility to facilitate or provide refunds or returns in any manner, other than as expressly provided in the .

ii. Sellers.
By using the Ishaanvi Payment Solution to accept Electronic Payment Methods, you are entering into an agreement with Stripe subject to the terms of the , which includes the  (collectively, the “Stripe Services Agreement”). Notwithstanding anything to the contrary in the Stripe Services Agreement, you will not have the right to have Stripe, and will not request that Stripe, transfer any buyer data Stripe collects via the Ishaanvi Payment Solution to an alternative payment processor. Except for the foregoing restriction that supersedes any rights you may have in the Stripe Services Agreement, the Stripe Services Agreement is separate from these Terms. Ishaanvi is not a party to the Stripe Services Agreement and will not be liable or responsible for the payment services provided by Stripe. If Stripe discontinues providing services in connection with the Ishaanvi Payment Solution, you authorize Stripe to share your payment method information with an alternative third-party payment processor that is or will be integrated into the Ishaanvi Payment Solution.

iii. Seller Fees.
You agree to pay the service fees (“Service Fees”) described in the  for the sales transactions you make using the Ishaanvi Payment Solution. The Service Fees include Electronic Payment Method processing fees to Stripe and service fees to Ishaanvi. Ishaanvi reserves the right to change the Service Fees from time to time.

iv. Receiving Sales Proceeds.
Upon completion of a sale in which the buyer uses the Ishaanvi Payment Solution, if you have not previously set up a Stripe Account, then you must set up a Stripe Account in accordance with the requirements specified by Stripe to receive the payment via the Ishaanvi Payment Solution. STRIPE MUST ACCEPT YOUR APPLICATION TO USE THE ISHAANVI PAYMENT SOLUTION BEFORE YOU CAN RECEIVE SALES PROCEEDS VIA THE ISHAANVI PAYMENT SOLUTION. IF STRIPE REJECTS YOUR APPLICATION OR YOU FAIL TO SET UP A STRIPE ACCOUNT WITHIN 90 DAYS AFTER COMPLETION OF A SALE PROCESSED BY STRIPE THROUGH THE ISHAANVI PAYMENT SOLUTION, THEN STRIPE MAY DISABLE OR LIMIT YOUR ABILITY TO RECEIVE SALES PROCEEDS VIA THE ISHAANVI PAYMENT SOLUTION.

v. Acceptable Use Violations. 
YOUR RIGHT AND/OR ABILITY TO RECEIVE SALES PROCEEDS VIA THE ISHAANVI PAYMENT SOLUTION MAY BE REVOKED, DISABLED OR LIMITED IF THE PURCHASE OR SALE VIOLATES SECTION 7 (ACCEPTABLE USE) OF THESE TERMS, INCLUDING FOR SALES THAT VIOLATE THE PROHIBITED ITEMS GUIDELINES.

vi. Additional Information. 
For additional information regarding the Ishaanvi Payment Solution, see our website .

vii. Transactions Final.
Regardless of the payment method chosen, ALL PURCHASES ARE FINAL, AND THERE ARE NO REFUNDS, UNLESS YOU AND THE SELLER OTHERWISE AGREE AND MAKE ARRANGEMENTS FOR A REFUND. Ishaanvi will not be responsible for facilitating refunds, other than as expressly provided with respect to the .

viii. Taxes.
It is your responsibility to determine what, if any, taxes apply to each transaction you complete via the Ishaanvi Service, including, for example, sales, use, value added, and similar taxes. It is also your responsibility to withhold, collect, report and remit the correct taxes to the appropriate tax authorities. Ishaanvi is not responsible for withholding, collecting, reporting, or remitting any sales, use, value added, or similar tax arising from any transaction you complete via the Ishaanvi Service.

C. Shipping.
From time to time, Ishaanvi may, in its sole discretion and pursuant to its , recommend a third party to allow sellers to ship purchased items to buyers.  Ishaanvi is not a party to transactions conducted between buyers and sellers, or to the shipping of items from sellers to buyers, and, other than as expressly provided in the , Ishaanvi will not be liable for, and you release us from any liability to you for, any losses, damages, or delays related to shipping.  You agree not to use the Ishaanvi shipping service to mail or cause to be mailed, or ship or cause to be shipped, any item purchased and sold through Ishaanvi in a manner that violates the law and/or India Postal Service or shipping regulations, including but not limited to INDIA Postal Service Publication 52.  You further warrant that any item you mail or ship contains no weapons, ammunition, explosives, living or infectious biological matter, human remains, pornography, alcohol, prescription drugs, illegal drugs, currency, dangerous goods, hazardous goods, or other goods that may not be shipped or mailed by law. As a seller, you assume full responsibility for compliance with all applicable laws and regulations, including those regarding mailing and shipping.  Anyone who sends, or causes to be sent, a prohibited, illegal, or improperly packaged or labeled material can be subject to legal penalties such as civil penalties, fines and/or imprisonment, including but not limited to those specified in 18 INDIAC. § 1716 and 39 INDIAC. § 3018.

i. Sellers.
From time to time, Ishaanvi may, in its sole discretion, permit certain sellers to post their items for sale nationwide. Sellers will be charged a posting fee for any sale that results in an item being shipped. Sellers who choose to post nationwide must ship their items in accordance with Ishaanvi’s Shipping Policy. When a seller accepts a buyer’s offer to purchase an item to be shipped, the seller must print the pre-paid shipping label and mail the item within 3 business days of accepting the offer. The seller may cancel an accepted offer up until the package is initially scanned for mailing. The buyer’s payment, minus Ishaanvi’s nationwide posting fee, will be released to the seller typically 3 business days after delivery, provided that no Buyer Protection claims are made by the buyer. Buyer Protection claims may result in delay and/or cancellation of payment being released to the seller.

ii. Buyers.
From time to time, Buyers will be able to view items posted nationwide by sellers who have agreed to use the Ishaanvi shipping feature. For these items, the buyer is solely responsible to pay the cost of shipping the item from the seller. Buyers can cancel an offer to purchase an item for shipping up until the seller has accepted the offer. When a seller accepts a buyer’s offer to purchase an item for shipping, Ishaanvi will charge or put a hold on the buyer’s method of payment, pending delivery of the item. If there are any problems with the delivery or the item itself, please consult the Ishaanvi . For any undisclosed damage, incorrect or missing items, or items that are not as described, buyers must contact Ishaanvi within 2 days of delivery, otherwise Ishaanvi will deem the transaction closed and release the buyer’s payment to the seller. Please review the Ishaanvi  to learn more. Buyers may also be given the option within the Ishaanvi Service to confirm the item purchased is as described after receiving and inspecting it. When done, Ishaanvi will also deem the transaction closed and release the buyer’s payment to the seller.

4. TruYou Feature.
We may at times offer features enabling you to apply for or request certain badges (each, a “Badge”) to be associated with your Ishaanvi Service account, including through your account profile. We may make available the TruYou feature (“TruYou”), through which we may associate a TruYou Badge with certain users that have provided personal identification documents (e.g., a driver’s license) to us. The display of a TruYou badge indicates only that a user has provided Ishaanvi with such documentation. THE TRUYOU BADGE DOES NOT DESIGNATE, AND WE DO NOT REPRESENT OR WARRANT THAT, (A) WE HAVE VERIFIED THAT A USER WITH A TRUYOU BADGE IS THE PERSON THAT THEY CLAIM TO BE, (B) THAT A USER IS IN FACT THE PERSON IDENTIFIED IN ANY PERSONAL IDENTIFICATION DOCUMENT THAT USER HAS PROVIDED TO US, OR (C) THAT WE HAVE TAKEN ANY STEPS TO RUN A CRIMINAL OR OTHER BACKGROUND CHECK OR OTHERWISE MAKE AN ASSESSMENT OF A USER’S INTEGRITY OR CHARACTER.

If you choose to use the TruYou feature, you represent and warrant to us that (a) any personal identification document that you provide to us is an unaltered and accurate image of your government-issued personal identification document that is without error, and (b) that you have all necessary permissions to provide such personal identification documents to us and your provision of such personal identification documents to us will not violate any law or regulation or cause us to be subject to any investigation, prosecution or legal action. DO NOT USE THIS FEATURE IF THE FOREGOING IS NOT TRUE. We may disclose your photo identification document or certain personal information you provide to our third-party service providers that may help us to detect inaccurate or fraudulent personal identification documents and related information. The TruYou feature and similar programs involving Badges may be discontinued at any time without notice, and we reserve the right to grant and revoke Badges for you or any other user at any time and without any liability to us.

5. Terms of Sale for Ishaanvi’s Paid Services.
From time to time, Ishaanvi may make certain services available for a fee in connection with the Ishaanvi Service (“Paid Services”). The following terms of sale apply solely to your purchase of Paid Services from Ishaanvi.

A. Fees.
Unless otherwise agreed upon by Ishaanvi in writing, the fees payable in connection with any Paid Services (“Fees”) will be specified via the Ishaanvi Service. All Fees are denominated in INDIA dollars and are exclusive of any applicable taxes.

B. Payment Method.
You may only pay Fees using valid payment methods acceptable to us, as specified via the Ishaanvi Service. You represent and warrant that you are authorized to use the payment method you designate via the Ishaanvi Service. You authorize us to charge your designated payment method for the total amount of your purchase, including any applicable taxes and other charges. If the payment method cannot be verified, is invalid or is otherwise not acceptable to us, your order may be suspended or cancelled.

C. Subscriptions.
CERTAIN OF THE PAID SERVICES PROVIDED BY ISHAANVI MAY BE OFFERED ON A SUBSCRIPTION BASIS WITH AUTO-RENEWING PAYMENTS (“SUBSCRIPTION SERVICES”). THE BILLING PERIOD FOR EACH TYPE OF SUBSCRIPTION SERVICE WILL BE AS SPECIFIED VIA THE ISHAANVI SERVICE AT THE TIME OF REGISTRATION. WHEN YOU REGISTER FOR ANY SUBSCRIPTION SERVICE, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT (I) ISHAANVI (OR ITS DESIGNATED THIRD-PARTY PAYMENT PROCESSOR) IS AUTHORIZED TO CHARGE YOU ON A RECURRING BASIS FOR THE SUBSCRIPTION SERVICE (IN ADDITION TO ANY APPLICABLE TAXES AND OTHER CHARGES) AT THE THEN-CURRENT RATES FOR AS LONG AS THE SUBSCRIPTION SERVICE CONTINUES, AND (II) THE SUBSCRIPTION SERVICE WILL CONTINUE UNTIL YOU CANCEL IT OR WE SUSPEND OR STOP PROVIDING ACCESS TO THE ISHAANVI SERVICE IN ACCORDANCE WITH THESE TERMS.

D. Cancellation Policy For Subscription Services. 
TO CANCEL ANY SUBSCRIPTION SERVICE, YOU MUST CONTACT US THROUGH OUR HELP CENTER VIA OUR MOBILE APP OR WEBSITE (WWW.ISHAANVI.COM) AND FOLLOW THE INSTRUCTIONS IN THE EMAIL WE SEND YOU IN RESPONSE TO YOUR CANCELLATION REQUEST. YOU MUST CANCEL A SUBSCRIPTION SERVICE BEFORE THE START OF THE NEXT BILLING PERIOD IN ORDER TO AVOID CHARGES FOR THE NEXT BILLING PERIOD’S FEES. FOLLOWING ANY CANCELLATION, YOU WILL CONTINUE TO HAVE ACCESS TO THE SUBSCRIPTION SERVICES (SUBJECT TO THESE TERMS) THROUGH THE END OF YOUR CURRENT BILLING PERIOD.

E. Price Changes.
ISHAANVI RESERVES THE RIGHT TO MODIFY THE FEES FOR ANY PAID SERVICES, INCLUDING ANY SUBSCRIPTION SERVICES, FROM TIME TO TIME IN ITS SOLE DISCRETION. FOR SUBSCRIPTION SERVICES, PRICE CHANGES WILL APPLY TO THE NEXT BILLING PERIOD.

F. Taxes.
You are responsible for any sales, duty or other governmental taxes or fees due with respect to your purchase of Paid Services. We will collect applicable sales tax if we determine that we have a duty to collect sales tax, and will provide notice of such taxes at the time you place your order.

G. Refunds.
Except as provided in Section 5(H), or as otherwise expressly agreed upon by Ishaanvi, all sales of Paid Services (including any Subscription Services) are final and there are no refunds. THERE ARE NO REFUNDS OR CREDITS FOR PARTIALLY USED SUBSCRIPTION SERVICES PERIODS.

H. Errors.
In the event of an error in connection with the pricing or charging of Paid Services, we reserve the right to correct such error and revise your order accordingly (including charging the correct price) or to cancel the purchase and refund any amount charged. Your sole remedy in the event of a billing error is to obtain a refund for the excess amount charged. To be eligible for such refund, you must provide notice of any such error within 120 days of the date of the billing statement in which such error first appeared.

6. Discontinuance of the Ishaanvi Service
Ishaanvi may, in its sole discretion and without liability to you, modify, discontinue, terminate, suspend or shut-down (temporarily or permanently) all or any portion of the Ishaanvi Service at any time, without prior notice. Upon any such action by Ishaanvi, you must immediately stop using the Ishaanvi Service. You may also cancel your Account at any time, as described in Section 15 below. In addition, the TruYou feature and similar programs involving Badges may be discontinued at any time without notice.

7. Acceptable Use
When accessing or using the Ishaanvi Service, you agree that you will not violate any law, contract, intellectual property or other third-party right or commit a tort. Without limiting the generality of the foregoing, you agree that you will not do, and will not permit any third party to do, any of the following:

Engage in any unauthorized use of the Ishaanvi Service (including, without limitation, political campaigning, advertising, or marketing);
Transmit or otherwise make available any content that: (1) you do not have the right to provide or transmit using the Ishaanvi Service, (2) may expose Ishaanvi or its affiliates, licensors, or users to any harm or liability, or (3) is harmful, fraudulent, deceptive, threatening, harassing, defamatory, obscene, unlawful, untrue, or otherwise objectionable;
Upload to, transmit, distribute, store, create, or otherwise sell or offer for sale anything that violates our .
Transmit or otherwise make available any content that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment;
Originate, send, deliver, relay or otherwise transmit unsolicited commercial email or other messages through the Ishaanvi Service;
Copy any portion of the Ishaanvi Service or any underlying content or source code;
Reverse engineer, disassemble or decompile any portion of the Ishaanvi Service or otherwise attempt to discover or re-create the source code to any software;
Distribute the software or source code behind the Ishaanvi Service to any third party;
Make any modification, adaptation, improvement, enhancement, translation or derivative work of or to any portion of the Ishaanvi Service;
Remove, alter, or obscure any copyright or other proprietary notices of Ishaanvi or its affiliates or licensors in any portion of the Ishaanvi Service;
Obscure or disable any advertisements that appear on or through the Ishaanvi Service;
Use any type of automated means, including without limitation any harvesting bot, robot, spider, script, crawler, scraper or other automated means or interface not provided by Ishaanvi, to utilize the Ishaanvi Service or to collect or extract data;
Access without authorization any networks, systems, or databases used in providing the Ishaanvi Service or any accounts associated with Ishaanvi Service, or to access or use any information therein for any purpose;
Attempt to probe, test, hack, or otherwise circumvent any security measures;
Violate any requirements, policies, procedures or regulations of any network connected to the Ishaanvi Service;
Use the Ishaanvi Service in any manner that could damage, disable, overburden, or otherwise impair the Ishaanvi Service (or the networks connected to the Ishaanvi Service);
Interfere with or disrupt the use and enjoyment by others of the Ishaanvi Service, including without limitation attempting, in any manner, to obtain the password, account, or other security information of any other user;
Falsely state, impersonate, or otherwise misrepresent your identity;
Provide false information during Account creation or when using the TruYou Badge or the Ishaanvi Payment Solution, or otherwise provide false, inaccurate or misleading information;
Create more than one Account or create an Account on behalf of anyone other than yourself without permission;
Use or attempt to use another user’s Account without authorization;
Attempt to pay for an item using the Ishaanvi Payment Solution with an Electronic Payment Method that you either do not own or are not validly authorized to use;
Use the Ishaanvi Service in any manner to stalk, harass, invade the privacy of, or otherwise cause harm to, any person;
Use the Ishaanvi Service in any manner that exposes Ishaanvi to any harm or liability of any nature;
Use the Ishaanvi Service to infringe or violate the intellectual property rights or any other rights of anyone else (including Ishaanvi);
Develop any third-party applications that interact with the Ishaanvi Service without Ishaanvi’s prior written consent;
Use the Ishaanvi Service to engage in any illegal or unauthorized purpose or to engage in, encourage, or promote activities that are unlawful, misleading, malicious or discriminatory, including, but not limited to violations of these Terms, illegal gambling, fraud, money-laundering, or terrorist activities;
Transfer any rights granted to you under these Terms; or
Encourage or induce any third party to engage in any of the activities prohibited under this section.
If you violate any of the foregoing, Ishaanvi reserves the right to suspend or terminate your right to access and use the Ishaanvi Service immediately without notice, and you will have infringed Ishaanvi’s intellectual property and other rights, which may subject you to prosecution and damages. Ishaanvi also reserves the right to take any remedies it deems appropriate under the circumstances if you have purchased or sold items that are in violation of this Section 7. Ishaanvi reserves the right at all times to monitor, review, retain and disclose any information regarding your use of the Ishaanvi Service as necessary to satisfy any applicable law, regulation, legal process or governmental request. You also acknowledge and agree that Ishaanvi is not responsible or liable for the conduct of, or your interactions with, any users of the Ishaanvi Service (whether online or offline). Your interactions with other users are solely between you and such users and we are not responsible or liable for any loss, damage, injury or harm which results from these interactions. In addition, enforcement of these Terms is solely in our discretion, and the absence of enforcement in some instances does not constitute a waiver of our right to enforce these Terms in other instances. These Terms do not create any private right of action on the part of any third party or any reasonable expectation or promise that the Ishaanvi Service will not contain any content that is prohibited by these Terms.

8. User Content
In the course of using the Ishaanvi Service, you may transmit or otherwise make available certain content, including information about yourself, content, messages, materials, data, information, text, photos, graphics, code or other items or materials (“User Content”) through interactive areas or services, such as posting items for sale, making an offer, private messaging, or other areas or services. User Content may be publicly viewable in some instances. Ishaanvi reserves the right, but does not have the obligation, to remove, screen or edit any User Content posted, transmitted, or stored on the Ishaanvi Service at any time and for any reason without notice. You will not (and will not allow or authorize any third-party to) post, upload to, transmit, distribute, store, create, solicit, disclose, or otherwise, publish through the Ishaanvi Service any of the following:

User Content that is, in Ishaanvi’s judgment, disrespectful or may expose Ishaanvi, Users or others to harm or liability;
User Content that may infringe the patent, trademark, trade secret, copyright, intellectual, privacy or proprietary right of any party;
Private information of any third parties, including addresses, phone numbers and payment card information;
Viruses, corrupted data or other harmful, disruptive, or destructive files; or
User Content that inhibits any other person from using or enjoying the Ishaanvi Service.
You are solely responsible for creating backup copies of and replacing your User Content at your sole cost and expense. You acknowledge and agree that Ishaanvi is not responsible for any errors or omissions that you make in connection with the Ishaanvi Service. By submitting or posting User Content, you hereby grant to Ishaanvi a non-exclusive, transferable, royalty-free, perpetual, irrevocable, sublicensable right to use, reproduce, modify, adapt, publish, translate, sell, create derivative works from, distribute, perform, and display the User Content, and your name, company name, location and any other information you submit with the User Content, in connection with the Ishaanvi Service. The use of your or any other User’s name, likeness, or identity in connection with the Ishaanvi Service does not imply any endorsement thereof unless explicitly stated otherwise. We also have the right to disclose your identity to any third party who is claiming that any content posted by you constitutes a violation of their intellectual property rights, or of their right to privacy.

9. Moderation
You agree that Ishaanvi may moderate access to and use of the Ishaanvi Service in our sole discretion through any means (including, for example, blocking, filtering, deletion, delay, omission, verification, and/or termination of your access. Furthermore, we have the right to remove any posting you make on the Ishaanvi Service if, in our opinion, your post does not comply with the content standards set out in Sections 7 and 8 above, and any other Ishaanvi Service rules, including without limitation the . You agree not to bypass or attempt to bypass such moderation. You further agree that Ishaanvi is not liable for moderating, not moderating or making any representations regarding moderating.

10. Third Party Services and Content
In using the Ishaanvi Service, you may view content, utilize services, or otherwise interact with content and services provided by third parties, including, but not limited to, the Ishaanvi Payment Solution provided by a third-party payment processor, the Ishaanvi fulfillment solution through third-party logistics providers, links and/or connections to websites, applications or services of such parties (“Third-Party Content”). Ishaanvi does not control, endorse or adopt any Third-Party Content and you acknowledge and agree that Ishaanvi will have no responsibility for any Third Party Content, including without limitation, material that may be misleading, incomplete, erroneous, offensive, indecent or otherwise objectionable. In addition, your business or other dealings or correspondence with such third parties are solely between you and the third parties. Ishaanvi is not responsible or liable for any damage or loss of any sort caused, or alleged to be caused, by or in connection with any such dealings, including the delivery, quality, safety, legality or any other aspect of any good or services that you may purchase or sell to or from a third party.

11. Feedback
Any comments or materials sent to us, including, but not limited to, ideas, questions, comments, suggestions, feedback or the like regarding the Ishaanvi Service or any other products or services of Ishaanvi (collectively, "Feedback"), is non-confidential and will become our sole property. We will have no obligation to you of any kind, monetary or non-monetary, with respect to such Feedback and will be free to reproduce, use, disclose, exhibit, display, transform, create derivative works from and distribute the Feedback to others without limitation or obligation. You waive any rights you may have to the Feedback (including any copyrights or moral rights). Further, you agree not to submit any feedback that is defamatory, illegal, offensive or otherwise violates any right of any third party, or breaches any agreement between you and any third party.

12. Copyright Policy
A. Repeat Infringer Policy. In accordance with the Digital Millennium Copyright Act (“DMCA”) and other applicable law, Ishaanvi has adopted a policy of terminating, in appropriate circumstances and at Ishaanvi’s discretion, users who are deemed to be repeat infringers. We also may, at Ishaanvi’s discretion, limit access to the Ishaanvi Service and terminate access of any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.

B. Copyright Complaints. If you believe that anything on the Ishaanvi Service infringes upon any copyright that you own or control, you may file a notification with Ishaanvi’s Designated Agent as set forth below:

Designated Agent:
Ishaanvi Copyright Agent
Address of Designated Agent:
Mukerian - Gurdaspur Road, Randhawa Colony, 
Mukerian, Punjab 144211
Email Address of Designated Agent:

Please see 17 INDIAC. § 512(c)(3) for the requirements of a proper notification. If you knowingly misrepresent in your notification that the material or activity is infringing, you may be liable for any damages, including costs and attorneys’ fees, incurred by Ishaanvi or the alleged infringer as the result of Ishaanvi’s reliance upon such misrepresentation in removing or disabling access to the material or activity claimed to be infringing.

13. Intellectual Property Rights
Unless otherwise indicated, the Ishaanvi Service and all content, materials, information, functionality and other materials displayed, performed, contained or available on or through the Ishaanvi Service, including, without limitation, the Ishaanvi logo, and all designs, text, graphics, pictures, information, data, sound files, images, illustrations, software, other files, and the selection and arrangement thereof (collectively, the “Materials”) are the proprietary property of Ishaanvi or its affiliates or licensors, and are protected by INDIA and international copyright laws and other intellectual property rights laws.

Except as otherwise provided, subject to your compliance with all of the terms and conditions of these Terms, and in consideration of your promises reflected herein (and with respect to any services requiring payment of fees, your payment of such fees), we grant to you a revocable, personal, non-exclusive, non-assignable and non-transferable license for personal, non-commercial purposes, except where explicitly provided otherwise, to (i) access and use the Ishaanvi Service, (ii) cause the Materials to be displayed from a computer and/or mobile device and (iii) use the Materials, solely as permitted under these Terms (the “License”). Ishaanvi and its affiliates and licensors reserve all rights not expressly granted to you in these Terms. You agree that these Terms do not grant you any rights in or licenses to the Ishaanvi Service or the Materials, except for this express, limited License. You will not otherwise copy, transmit, distribute, sell, resell, license, de-compile, reverse engineer, disassemble, modify, publish, participate in the transfer or sale of, create derivative works from, perform, display, incorporate into another website, or in any other way exploit any of the Materials or any other part of the Ishaanvi Service or any derivative works thereof, in whole or in part for commercial or non-commercial purposes. Without limiting the foregoing, you agree not to frame or display the Ishaanvi Service or Materials (or any portion thereof) as part of any other website or any other work of authorship without our prior written permission. The License granted under this Section will automatically terminate if we suspend or terminate your access to the Ishaanvi Service.

14. Trademarks
Ishaanvi, Ishaanvi.co, Ishaanvinow.com and other Ishaanvi graphics, logos, page headers, buttons, icons, scripts, and service names are trademarks, registered trademarks, or trade dress of Ishaanvi or its affiliates in the INDIA and/or other countries, and may not be copied, imitated, or used, in whole or in part, without Ishaanvi’s prior written consent. You will not use any trademark, product or service name of Ishaanvi without our prior written permission, including without limitation any metatags or other “hidden text” utilizing any trademark, product of service name of Ishaanvi. All other registered trademarks and service marks are used for reference purposes only, and remain the property of their respective owners. Reference to any products, services, processes or other information, by name, trademark, manufacturer, supplier or otherwise does not constitute or imply an endorsement, sponsorship or recommendation by Ishaanvi.

15. Suspension; Termination.
Ishaanvi may revoke or terminate your License to access or use the Ishaanvi Service for any reason without notice at Ishaanvi’s sole discretion. Without limiting the generality of the foregoing, we may revoke or terminate the License if you: (i) breach any obligation in these Terms or in any other agreement between you and us, (ii) violate any policy or guideline applicable to the Ishaanvi Service or Materials, or any other Ishaanvi product or service, or (iii) use the Ishaanvi Service or the Materials other than as specifically authorized in these Terms, without our prior written permission. You will stop accessing or using the Ishaanvi Service immediately if Ishaanvi suspends or terminates your License to access or use the Ishaanvi Service. Ishaanvi reserves the right, but does not undertake any duty, to take appropriate legal action including the pursuit of civil, criminal, or injunctive redress against you for continuing to use the Ishaanvi Service during suspension or after termination. Ishaanvi may recover its reasonable attorneys’ fees and court costs from you for such action. These Terms will remain enforceable against you while your License to access or use the Ishaanvi Service is suspended and after it is terminated.

You may also terminate your License to access or use the Ishaanvi Service by closing your Account at any time. For more details on how to close your Account, please refer to our FAQs.

16. Disclaimer of Warranties
A. TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, AND EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN A WRITING BY US, THE ISHAANVI SERVICE, THE MATERIALS, THE PAID SERVICES, AND ANY ITEMS SOLD BY USERS THROUGH THE ISHAANVI SERVICE ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, WE EXPRESSLY DISCLAIM, AND YOU WAIVE, ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT AS TO THE ISHAANVI SERVICE, INCLUDING THE INFORMATION, CONTENT AND MATERIALS CONTAINED THEREIN, AND ANY ITEMS SOLD THROUGH THE ISHAANVI SERVICE.

B. WITHOUT LIMITING THE FOREGOING, TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, NEITHER ISHAANVI NOR ANY OF ITS AFFILIATES OR LICENSORS, NOR THE RESPECTIVE OFFICERS, DIRECTORS, LICENSORS, EMPLOYEES OR REPRESENTATIVES OF SUCH PARTIES (COLLECTIVELY, THE "ISHAANVI PROVIDERS") REPRESENT OR WARRANT (I) THAT THE ISHAANVI SERVICE, MATERIALS OR ITEMS SOLD THROUGH THE ISHAANVI SERVICE WILL MEET YOUR REQUIREMENTS OR BE ACCURATE, COMPLETE, APPROPRIATE, RELIABLE OR ERROR FREE; (II) THAT THE ISHAANVI SERVICE, MATERIALS OR ITEMS SOLD THROUGH THE ISHAANVI SERVICE WILL ALWAYS BE AVAILABLE OR WILL BE UNINTERRUPTED, ACCESSIBLE, TIMELY, RESPONSIVE OR SECURE; (III) THAT ANY DEFECTS WILL BE CORRECTED, OR THAT THE ISHAANVI SERVICE, MATERIALS OR ITEMS SOLD THROUGH THE ISHAANVI SERVICE WILL BE FREE FROM VIRUSES, "WORMS," "TROJAN HORSES" OR OTHER HARMFUL PROPERTIES; (IV) THE ACCURACY, RELIABILITY, TIMELINESS OR COMPLETENESS OF ANY MATERIALS AVAILABLE ON OR THROUGH THE ISHAANVI SERVICE; (V) ANY IMPLIED WARRANTY ARISING FROM COURSE OF DEALING OR USAGE OF TRADE; (VI) THAT THE ISHAANVI SERVICE, MATERIALS OR ITEMS SOLD THROUGH THE ISHAANVI SERVICE ARE NON-INFRINGING; OR (VII) THAT ANY BADGE IS A REPRESENTATION AS TO THE IDENTITY, CHARACTER OR INTEGRITY OF ANY PERSON, BUSINESS, OR ENTITY THAT IS ASSOCIATED WITH A BADGE.

C. YOU ACKNOWLEDGE THAT INFORMATION YOU STORE OR TRANSFER THROUGH THE ISHAANVI SERVICE MAY BECOME IRRETRIEVABLY LOST OR CORRUPTED OR TEMPORARILY UNAVAILABLE DUE TO A VARIETY OF CAUSES, INCLUDING SOFTWARE FAILURES, PROTOCOL CHANGES BY THIRD PARTY PROVIDERS, INTERNET OUTAGES, DISASTERS, SCHEDULED OR UNSCHEDULED MAINTENANCE, OR OTHER CAUSES OUTSIDE OF OUR REASONABLE CONTROL. YOU ARE SOLELY RESPONSIBLE FOR BACKING UP AND MAINTAINING DUPLICATE COPIES OF ANY INFORMATION YOU STORE OR TRANSFER THROUGH THE ISHAANVI SERVICE.

Some jurisdictions do not allow the disclaimer of implied terms in contracts with consumers, so some or all of the disclaimers in this section may not apply to you.

17. Assumption of Risk
A. YOU ACKNOWLEDGE AND AGREE THAT THERE ARE RISKS ASSOCIATED WITH UTILIZING AN INTERNET-BASED MARKETPLACE AND INTERACTING WITH OTHER USERS IN PERSON. WE DO NOT INVESTIGATE OR VERIFY ANY USER’S REPUTATION, CONDUCT, MORALITY, CRIMINAL BACKGROUND, OR ANY INFORMATION USERS MAY SUBMIT TO THE SERVICES (OTHER THAN IN CONNECTION WITH THE TRUYOU FEATURE DESCRIBED IN SECTION 4). YOU ARE SOLELY RESPONSIBLE FOR TAKING ALL NECESSARY PRECAUTIONS WHEN INTERACTING WITH OTHER USERS, PARTICULARLY WHEN MEETING A STRANGER IN PERSON FOR THE FIRST TIME. IT IS POSSIBLE THAT OTHER USERS MAY ATTEMPT TO PHYSICALLY HARM OR DEFRAUD YOU OR OBTAIN INFORMATION FROM YOU FOR FRAUDULENT PURPOSES. YOU ARE SOLELY RESPONSIBLE FOR, AND ASSUME ALL RISKS RELATED TO, SELLING AND BUYING THROUGH ISHAANVI’S SERVICES (INCLUDING ALL ONLINE AND OFFLINE INTERACTIONS WITH OTHER USERS).

B. COMMUNITY MEETUP SPOTS.
COMMUNITY MEETUP SPOTS ARE LOCATIONS IN WHICH A THIRD PARTY (SUCH AS A POLICE DEPARTMENT OR LOCAL STORE) HAS AGREED TO POST A COMMUNITY MEETUP SPOT SIGN. WE ENCOURAGE THIRD PARTIES TO PLACE COMMUNITY MEETUP SPOTS IN WELL-LIT LOCATIONS, WITH SURVEILLANCE AND IN GENERALLY WELL-TRAFFICKED AREAS; HOWEVER, ISHAANVI DOES NOT INDEPENDENTLY VERIFY THE CONDITIONS AT ANY COMMUNITY MEETUP SPOT, DOES NOT MONITOR COMMUNITY MEETUP SPOTS AND DOES NOT WARRANTY THEIR SAFETY OR CONDITION. YOUR USAGE OF COMMUNITY MEETUP SPOTS, AND ANY DISPUTE ARISING OUT OF THAT USAGE, INCLUDING AGAINST ANY THIRD PARTY POSTING A COMMUNITY MEETUP SPOT SIGN, REMAINS SUBJECT TO THE EXPRESS PROVISIONS IN SECTIONS 16-22 OF THESE TERMS OF SERVICE.

18. Limitation of Liability
A. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ISHAANVI OR THE ISHAANVI PROVIDERS BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES, INCLUDING, BUT NOT LIMITED TO, LOSS OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE), OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH: (I) USE OF THE ISHAANVI SERVICE OR MATERIALS, INCLUDING, BUT NOT LIMITED TO, ANY DAMAGE CAUSED BY ANY RELIANCE ON, OR ANY DELAYS, INACCURACIES, ERRORS OR OMISSIONS IN, ANY OF THE ISHAANVI SERVICE OR MATERIALS, (II) ANY INABILITY TO USE THE ISHAANVI SERVICE OR MATERIALS FOR WHATEVER REASON, OR (III) ANY GOODS OR SERVICES DISCUSSED, PURCHASED OR OBTAINED, DIRECTLY OR INDIRECTLY, THROUGH THE ISHAANVI SERVICE, EVEN IF ISHAANVI OR THE ISHAANVI PROVIDERS ARE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, INCLUDING WITHOUT LIMITATION ANY DAMAGES CAUSED BY OR RESULTING FROM (Y) RELIANCE BY ANY USER ON ANY INFORMATION OBTAINED FROM COMPANY, OR (Z) THAT RESULT FROM EVENTS BEYOND ISHAANVI’S OR THE ISHAANVI PROVIDERS' REASONABLE CONTROL, SUCH AS SITE INTERRUPTIONS, DELETION OF FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES, DELAYS IN OPERATION OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR NOT RESULTING FROM A FORCE MAJEURE EVENT, COMMUNICATIONS FAILURE, THEFT, DESTRUCTION OR UNAUTHORIZED ACCESS TO ISHAANVI’S RECORDS, PROGRAMS OR SERVICES.

B. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE AGGREGATE LIABILITY OF ISHAANVI OR THE ISHAANVI PROVIDERS (JOINTLY), ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE THE OFFER UP SERVICE OR OTHERWISE RELATING TO THESE TERMS EXCEED THE GREATER OF (I) ANY COMPENSATION YOU PAY, IF ANY, TO ISHAANVI FOR ACCESS TO OR USE OF THE ISHAANVI SERVICE OR MATERIALS DURING THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY; OR (II) Rs.7000 Indian Rupees.

C. THE LIMITATIONS SET FORTH IN THIS SECTION 18 WILL NOT LIMIT OR EXCLUDE LIABILITY FOR ISHAANVI OR THE ISHAANVI PROVIDERS' GROSS NEGLIGENCE, INTENTIONAL, WILLFUL, MALICIOUS OR RECKLESS MISCONDUCT OR FRAUD.

19. Indemnity
You agree to hold harmless, defend and indemnify Ishaanvi and the Ishaanvi Providers from all liabilities, losses, damages, deficiencies, claims, causes of action, demands and expenses, (including, but not limited to, reasonable attorneys' fees), that are due to, arise from or otherwise relate to your conduct or your use or misuse of the Ishaanvi Service or Materials, including, without limitation, any actual or threatened suit, demand or claim made against Ishaanvi or any Ishaanvi Provider that arises out of or relates to: (i) any intellectual property rights or other proprietary rights of any third party, (ii) your breach of these Terms including without limitation your breach of any of your representations and warranties; (iii) your use of any of the Ishaanvi Service or Materials; (iv) any content that you store on or transmit through the Ishaanvi Service; or (v) any items that you mail or ship in connection with the Ishaanvi Service, including items sold to other Ishaanvi users. Ishaanvi may assume exclusive control of any defense of any matter subject to indemnification by you, and you agree to cooperate with Ishaanvi in such event.

20. Arbitration
PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT REQUIRES YOU TO SUBMIT TO BINDING ARBITRATION (INCLUDING A JURY TRIAL WAIVER) ANY AND ALL DISPUTES (OTHER THAN SPECIFIED INTELLECTUAL PROPERTY CLAIMS AND SMALL CLAIMS) WITH ISHAANVI AND IT LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM ISHAANVI (NO CLASS ARBITRATIONS, CLASS ACTIONS OR REPRESENTATIVE ACTIONS OR ARBITRATIONS).

A. Binding Arbitration.
Except for any disputes, claims, suits, actions, causes of action, demands or proceedings (collectively, “Disputes”) arising out of or related to a violation of Section 7 or Disputes in which either party seeks to bring an individual action in small claims court or seeks injunctive or other equitable relief for the alleged unlawful use of intellectual property, including, without limitation, copyrights, trademarks, trade names, logos, trade secrets or patents, you and Ishaanvi agree (1) to waive your and Ishaanvi’s respective rights to have any and all Disputes arising from or related to these Terms, the Ishaanvi Service or the Materials, resolved in a court, and (2) to waive your and Ishaanvi’s respective rights to a jury trial. Instead, you and Ishaanvi agree to arbitrate Disputes through binding arbitration (which is the referral of a Dispute to one or more persons charged with reviewing the Dispute and making a final and binding determination to resolve it instead of having the Dispute decided by a judge or jury in court).

B. No Class Arbitrations, Class Actions or Representative Actions.
You and Ishaanvi agree that any Dispute arising out of or related to these Terms, the Ishaanvi Service or the Materials is personal to you and Ishaanvi and that such Dispute will be resolved solely through individual arbitration and will not be brought as a class arbitration, class action or any other type of representative proceeding. You and Ishaanvi agree that there will be no class arbitration or arbitration in which an individual attempts to resolve a Dispute as a representative of another individual or group of individuals. Further, you and Ishaanvi agree that a Dispute cannot be brought as a class or other type of representative action, whether within or outside of arbitration, or on behalf of any other individual or group of individuals.

C. Federal Arbitration Act.
You and Ishaanvi agree that these Terms affect interstate commerce and that the enforceability of this Section 20 shall be both substantively and procedurally governed by and construed and enforced in accordance with the Federal Arbitration Act, 9 INDIAC. § 1 et seq. (the “FAA”), to the maximum extent permitted by applicable law.

D. Notice; Informal Dispute Resolution.
You and Ishaanvi agree that each party will notify the other party in writing of any arbitrable or small claims Dispute within thirty (30) days of the date it arises, so that the parties can attempt in good faith to resolve the Dispute informally. Notice to Ishaanvi shall be sent by certified mail or courier to Ishaanvi, Inc., Attn: Ishaanvi Designated Agent, Mukerian- Gurdaspur Road, Randhawa Colony, Punjab 144211. Your notice must include (1) your name, postal address, telephone number, the email address you use or used for your Account, and, if different, an email address at which you can be contacted, (2) a description in reasonable detail of the nature or basis of the Dispute, and (3) the specific relief that you are seeking. Our notice to you will be sent to the email address you used to register for your Account, and will include (a) our name, postal address, telephone number and an email address at which we can be contacted with respect to the Dispute, (b) a description in reasonable detail of the nature or basis of the Dispute, and (c) the specific relief that we are seeking. If you and Ishaanvi cannot agree how to resolve the Dispute within thirty (30) days after the date notice is received by the applicable party, then either you or Ishaanvi may, as appropriate and in accordance with this Section 20, commence an arbitration proceeding, or to the extent specifically provided for in section 20(A), file a claim in court.

E. Process. 
Except for Disputes arising out of or related to a violation of Section 7 or Disputes in which either party seeks to bring an individual action in small claims court or seeks injunctive or other equitable relief for the alleged unlawful use of intellectual property, including without limitation, copyrights, trademarks, trade names, logos, trade secrets or patents, you and Ishaanvi agree that any Dispute must be commenced or filed by you or Ishaanvi within one (1) year of the date the Dispute arose, otherwise the underlying claim is permanently barred (which means that you and Ishaanvi will no longer have the right to assert such claim regarding the Dispute). You and Ishaanvi agree that (1) any arbitration will occur in Chandigarh, (2) arbitration will be conducted confidentially by a single arbitrator in accordance with the rules of the Judicial Arbitration and mediation Services (“JAMS”), which are hereby incorporated by reference, and (3) that the state or federal courts of the State of Punjab and the India, respectively, sitting in Chandigarh, have exclusive jurisdiction over any appeals and the enforcement of an arbitration award. You may also litigate a Dispute in the small claims court located in the county of your billing address if the Dispute meets the requirements to be heard in small claims court.

F. Authority of the Arbitrator.
As limited by the FAA, these Terms and the applicable JAMS rules, the arbitrator will have (1) the exclusive authority and jurisdiction to make all procedural and substantive decisions regarding a Dispute, including the determination of whether a Dispute is arbitrable, and (2) the authority to grant any remedy that would otherwise be available in court; provided, however, that the arbitrator does not have the authority to conduct a class arbitration or a representative action, which is prohibited by these Terms. The arbitrator may only conduct an individual arbitration and may not consolidate more than one individual’s claims, preside over any type of class or representative proceeding or preside over any proceeding involving more than one individual.

G. Rules of JAMS. 
The rules of JAMS and additional information about JAMS are available on the . By agreeing to be bound by these Terms, you either (1) acknowledge and agree that you have read and understand the rules of JAMS, or (2) waive your opportunity to read the rules of JAMS and any claim that the rules of JAMS are unfair or should not apply for any reason.

H. Severability.
If any term, clause or provision of this Section 20 is held invalid or unenforceable, it will be so held to the minimum extent required by law, and all other terms, clauses and provisions of this Section 20 will remain valid and enforceable. Further, the waivers set forth in Section 20(B) are severable from the other provisions of these Terms and will remain valid and enforceable, except as prohibited by applicable law.

I. Opt-Out Right.
You have the right to opt out of binding arbitration within thirty (30) days of the date you first accepted the terms of this Section 20 by writing to: Ishaanvi, Inc., Attn: Ishaanvi Designated Agent, 227 Bellevue Way NE #57, Bellevue, Punjab 98004. In order to be effective, the opt-out notice must include your full name and clearly indicate your intent to opt-out of binding arbitration. By opting out of binding arbitration, you are agreeing to resolve Disputes in accordance with Section 21.

21. Governing Law; Venue.
These Terms, your access to and use of the Ishaanvi Service and Materials shall be governed by and construed and enforced in accordance with the laws of the State of Punjab without regard to conflict of law rules or principles (whether of the State of Punjab or any other jurisdiction) that would cause the application of the laws of any other jurisdiction. Any Dispute between the parties that is not subject to arbitration or cannot be heard in small claims court, shall be resolved in the state or federal courts of the State of Punjab and the India, respectively, Chandigarh.

22. Miscellaneous
A. Entire Agreement; Order of Precedence. These Terms contain the entire agreement, and supersede all prior and contemporaneous understandings between the parties regarding the Ishaanvi Service. These Terms do not alter the terms or conditions of any other electronic or written agreement you may have with Ishaanvi for the Ishaanvi Service or for any other Ishaanvi product, feature, service or otherwise. In the event of any conflict between these Terms and any other agreement you may have with Ishaanvi, the terms of that other agreement will control only if these Terms are specifically identified and declared to be overridden by such other agreement.

B. Amendments.
We reserve the right to make changes or modifications to these Terms from time to time, in our sole discretion. If we make changes to these Terms, we will provide you with notice of such changes, such as by sending you an email and/or by posting the amended Terms via the Ishaanvi Service and updating the “Last Updated” date at the top of these Terms. All amended Terms will become effective immediately on the date they are posted to the Ishaanvi Service unless we state otherwise via our notice of such amended Terms. Any amended Terms will apply prospectively to use of the Ishaanvi Service after such changes become effective. Your continued use of the Ishaanvi Service following the effective date of such changes will constitute your acceptance of such changes. If you do not agree to any amended Terms, you must discontinue using the Ishaanvi Service.

C. Severability.
If any provision of these Terms is held to be unenforceable for any reason, such provision will be reformed only to the extent necessary to make it enforceable, and such decision will not affect the enforceability of such provision under other circumstances, or of the remaining provisions hereof under all circumstances.

D. Waiver.
Our failure or delay in exercising any right, power or privilege under these Terms will not operate as a waiver thereof.

E. Relationship.
Ishaanvi is an independent contractor for all purposes, and is not your agent or trustee. You are not an agent of Ishaanvi.

F. Assignment.
You may not assign or transfer any of your rights or obligations under these Terms without prior written consent from Ishaanvi, including by operation of law or in connection with any change of control. Ishaanvi may assign or transfer any or all of its rights under these Terms, in whole or in part, without obtaining your consent or approval.

G. Headings.
Headings of sections are for convenience only and will not be used to limit or construe such sections.

H. Survival.
Sections 16 (Disclaimer of Warranties), 18 (Limitation of Liability), 19 (Indemnity), 20 (Arbitration), 21 (Governing Law; Venue), this Section 22 (Miscellaneous), and any other term that, by its nature, should survive, will survive any termination or expiration of these Terms.`;
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch } = styles;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Terms of Service"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={5} padding={[10, 10]} style={[stretch]} >
                        <WView flex dial={2} style={[stretch]}>
                            <WText lines={10000}>
                                {this.termAndConditonsData}
                            </WText>
                        </WView>
                    </WView>
                </ScrollView>
            </WView >
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    }
}
