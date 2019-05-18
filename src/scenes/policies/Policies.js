import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Image } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';

export default class Policy extends Component {

    constructor(props) {
        super(props);

        this.policyData = `LAST UPDATED: April 16, 2019

This Privacy Policy explains how information about you is collected, used and disclosed by Ishaanvi, Inc. (hereafter “Ishaanvi”, “our,” “we,” or “us”). This Privacy Policy applies to information we collect when you use our website, mobile applications and other online services (collectively, the “Ishaanvi Service”) or when you otherwise interact with us.

We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with more prominent notice (such as adding a statement to our homepage or sending you an email notification). We encourage you to review the Privacy Policy whenever you access the Ishaanvi Service to stay informed about our information practices and the ways you can help protect your privacy.

Note: Ishaanvi is piloting a new electronic payments solution that is only available to certain users. As a result, some of the provisions of this privacy policy related to the payments solution may not apply to all users.

Collection of Information
1. Information You Provide to Us.
Ishaanvi collects information that you provide directly to us. For example, we collect information when you register or update the details of your account, participate in identification badge programs such as TruYou, post information in order to sell any good through the Ishaanvi Service, enroll in any third-party operated payment processing services offered in connection with the Ishaanvi Service, communicate with other users, provide reviews or other comments, purchase any services from Ishaanvi, request customer support or otherwise communicate with us. The types of information we may collect include your name, email address, Ishaanvi account password, telephone number, postal address including city, state and zip code, photographs, written descriptions of your posted goods, any bids you make on offers through the Ishaanvi Service, any reviews or comments you make using the Ishaanvi Service, all correspondence or communications with other users or with us conducted via the Ishaanvi Service, government-issued identification documents (such as a driver’s license), and any other information you choose to provide.


2. Information We Collect Automatically When You Use the Ishaanvi Service. 
When you access or use the Ishaanvi Service, we automatically collect information about you, including:

2.1. Log Information:
We log information about your use of the Ishaanvi Service, including the type of browser you use, access times, pages viewed, your IP address and the page you visited before navigating to our Ishaanvi Service.

2.2. Device Information: 
We collect information about the computer or mobile device you use to access the Ishaanvi Service, including the hardware model, operating system and version, unique device identifiers and mobile network information.

2.3. Location Information: 
If you consent to the collection of location information from your computer or mobile device, we may collect this information when you access or use the IshaanviService, or when you otherwise consent to the collection of this information. We may also use your IP address to infer an approximate geographic location for your computer or device. For more details, please see “Your Information Choices” below.

2.4. Information Collected by Cookies and Other Tracking Technologies: 
We use various technologies to collect information, and this may include sending cookies to your computer or mobile device. Cookies are small data files stored on your hard drive or in device memory that helps us to improve the Ishaanvi Service and your experience, see which areas and features of the Ishaanvi Service are popular and count visits. We may also collect information using web beacons (also known as “gifs,” “pixel tags” and “tracking pixels”). Web beacons are electronic images that may be used in the Ishaanvi Service or emails and help deliver cookies, count visits, understand usage and campaign effectiveness and determine whether an email has been opened and acted upon. For more information about cookies, and how to disable them, please see “Your Information Choices” below.


3. Information from Third Parties. 
Ishaanvi may, from time to time, obtain information from other sources and combine that with information we collect through the Ishaanvi Service in order to enhance our ability to serve you, prevent fraudulent transactions, tailor our content to you, offer you opportunities to purchase products or services that we believe may be of interest to you, and for any other purposes described in this Privacy Policy. For example, if you create or log into your account through a social media site, we will have access to certain information from that site, such as your name, account information and friends lists, in accordance with the authorization procedures determined by such social media site. We may also receive transaction information from Stripe Inc. when you purchase or sell a good using the Ishaanvi payment solution, including the date and time of sale and the amount of the sale.


4. Payment Information Collected by Stripe. Ishaanvi is integrated with Stripe Inc.’s (“Stripe”) services to allow sellers to accept credit card and other electronic payment methods for goods they list for sale on the Ishaanvi Service. Stripe provides these services directly to sellers pursuant to its own terms and privacy policy. When signing up to receive funds electronically, Stripe, and not Ishaanvi, collects some of the information provided by sellers via the Ishaanvi Service, including debit card numbers, Social Security numbers, government IDs, and bank account information. For more information about the third-party payment processing services integrated with the Ishaanvi Service, please see our website.



Use of Information.
5. General Uses. 
Ishaanvi uses information about you for various purposes, including to:

5.1. Enable you to access and use the Ishaanvi Service, to personalize the Ishaanvi Service, and to optimize the type of offers presented to you when you use the Ishaanvi Service;

5.2. Create and maintain a trusted and safer environment on the Ishaanvi Service, including through detection and prevention of fraud, unauthorized access, intrusion, and service interruption;

5.3. Conduct investigations and to respond to disputes between users, error resolution, and other similar customer support service;

5.4. Enable any identification programs we may institute and in which you elect or are required to participate (e.g. TruYou), such as verifying your identity and address, and conduct checks against various publicly available databases;

5.5. Operate, protect, improve and optimize the Ishaanvi Service, our business, and our users’ experience;

5.6. Perform analytics, conduct research, and monitor and analyze trends, usage and activities in connection with the Ishaanvi Service;

5.7. Communicate with you about products, services, offers, promotions, rewards, and events offered by Ishaanvi and others, and provide advertisements that match user profiles or interests, news and information we think will be of interest to you;

5.8. Send you service, support and administrative messages, reminders, technical notices, updates, security alerts, and information requested by you;

5.9. Comply with our legal obligations or requests from law enforcement agencies, resolve any disputes that we may have with any of our users, and enforce our agreements with third parties;

5.10. Link or combine with information we get from others to help understand your needs and provide you with better service;

5.11. Assist third-party payment processors with transaction processing, error, chargeback and disputed transaction resolution, and similar payment processing functions; and

5.12. Carry out any other purpose for which the information was collected.

Ishaanvi is based in the India and the information we collect is governed by INDIAN law. By accessing or using the Ishaanvi Service or otherwise providing information to us, you consent to the processing and transfer of information in and to the INDIA and other countries, where you may not have the same rights and protections as you do under local law.


Sharing of Information.
6. General.
We may share information about you as follows or as otherwise described in this Privacy Policy:
6.1. With the public on the Ishaanvi Service. For a detailed description of the type of information associated with your Ishaanvi account that is made available publicly through the Ishaanvi Service, please see our .

6.2 When sellers register through the Ishaanvi Service to receive electronic payments via Stripe’s services, we will share certain information about them with Stripe, including name, address, IP address and date of birth. This information is in addition to the information collected directly by Stripe (as described above in “Payment Information Collected by Stripe”). Stripe may use this information for the purposes described in its privacy policy, including for fraud prevention.

6.3. With vendors, consultants and other service providers who need access to such information to carry out work on our behalf (including, without limitation, with third-party service providers that may use the information we share to help us and other companies detect inaccurate personal information and prevent fraudulent transactions);

6.4. In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation or legal process, or as otherwise required by any applicable law, rule or regulation;

6.5. If we believe your actions are inconsistent with the spirit or language of our user agreements or policies, or to protect the rights, property and safety of Ishaanvi or others;

6.6. In connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company;

6.7. Between and among Ishaanvi, and its current and future parents, affiliates, subsidiaries, and other companies under common control and ownership; and

6.8. With your consent or at your direction, including if we notify you through the Ishaanvi Service that the information you provide will be shared in a particular manner and you provide such information.


We may also share aggregated or de-identified information, which cannot reasonably be used to identify you.
7. Social Sharing Features.
The Ishaanvi Service may offer social sharing features and other integrated tools (such as the Facebook “Like” button), which let you share actions you take on the Ishaanvi Service with other media, and vice versa. The use of such features enables the sharing of information with your friends or the public, depending on the settings you establish with the entity that provides the social sharing feature. For more information about the purpose and scope of data collection and processing in connection with social sharing features, please visit the privacy policies of the entities that provide those features.


Advertising and Analytics Services Provided by Others
8. We may allow others to serve advertisements on our behalf across the Internet and to provide analytics services. These entities may use cookies, web beacons and other technologies to collect information about your use of the Ishaanvi Service and other websites and online services, including your IP address, web browser, pages viewed, time spent on pages, links clicked and conversion information. This information may be used by Ishaanvi and others to, among other things, analyze and track data, determine the popularity of certain content, deliver advertising and content targeted to your interests on the Ishaanvi Service and other websites and online services, and better understand your online activity. For more information about interest-based ads, or to opt out of having your web browsing information used for behavioral advertising purpose, please visit . Your mobile device operating system may also include a feature that allows you to opt out of having certain information collected through apps used for behavioral advertising purposes.


Security
9. Ishaanvi takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.


Your Choices
10. Account Information. You may update, correct or delete information about you at any time by logging in to your account. If you would like to cancel your Ishaanvi account entirely, please contact us, and enter your request for cancellation, but please note that we may retain certain information as required by law or for legitimate business purposes. For example, any reviews, forum postings and similar materials posted by you may continue to be publicly available on the Ishaanvi Service in association with your account name even after your Ishaanvi account is cancelled. We may also retain cached or archived copies of information about you for a certain period of time.


11. Location Information. When you first download or launch any of our mobile applications that collect location information or first use any features that use location information, you will be asked to consent to the application’s collection of this information. If you initially consent to our collection of location information, you can subsequently stop the collection of this information at any time by changing the preferences on your mobile device. You may also stop our collection of location information by following the standard uninstall process to remove all of our mobile applications form your device.


Even if you do not provide us with consent to collect precise location information from your mobile device or platform, we may use your IP address to infer an approximation of your location when using certain features of the Ishaanvi Services, such as the `;
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch } = styles;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Privacy Policy"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={5} padding={[10, 10]} style={[stretch]} >
                        <WView flex dial={2} style={[stretch]}>
                            <WText lines={10000}>
                                {this.policyData}
                                <WText lines={2} color={Palette.white} style={{ backgroundColor: Palette.green }}>Ishaanvi payments solution.</WText></WText>
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
