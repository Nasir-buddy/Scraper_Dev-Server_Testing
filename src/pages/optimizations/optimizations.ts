// export const Alerts = [
//     {
//         id: "AL001",
//         title: "CTR (outbound) too low, while video stop rate is average or above.",
//         description: `This means the video ad is doing an acceptable job at stopping people and getting them 
//             to watch but the number of people who click on the call-to-action link provided after 
//             viewing your ad is lower than expected (CTR outbound too low).

//             Potential causes:
//             1. Video content might not be compelling. Meaning ad viewers don't stay watching 
//             long enough to be compelled to click on the call-to-action button. They won't 
//             move on to the next step because they are cold to begin with and by not 
//             watching the video there is no change they will care enough about what comes 
//             next after the ad.
//             2. Call-to-action text may not be clear enough. It means they are watching enough 
//             of the video but they are not sure if they want to click the call-to-action button.`,
//         isExpanded: false,
//         followUpQuestions: [
//             {
//                 id: "FU001",
//                 question: "Why does CTR matter?",
//                 answer: `CTR (outbound) is one of the earlier indicators of success in an Ads campaign. Having fewer people click on your call-to-action link means there will be less potential visitors to convert, causing downstream problems.`,
//                 isExpanded: false
//             },
//             {
//                 id: "FU002",
//                 question: "I think the video on the ad is compelling, why can't we just keep it?",
//                 answer: `This appears to have reached **[xxxx]** people already in the last **[xxxx]** days, so we can safely say it's not an ad worth keep putting money on.`,
//                 isExpanded: false
//             },
//             {
//                 id: "FU003",
//                 question: "What part of the video should I change then, if the first part is working fine?",
//                 answer: "Check out the proposed optimizations listed for you.",
//                 isExpanded: false
//             }
//         ],
//         optimizations: [
//             {
//                 id: "OPT001",
//                 description: `Replace the video with a new 2 or 3 video variations following the Video ad content framework but keep the beginning ('hook') part. Here's an [Example 1] of what a video for cold campaigns is supposed to look like. Once the videos are ready, go to the ad campaign and create a new ad with the videos, keep using the same text to accompany the ad. Only the videos need to be replaced.`
//             },
//             {
//                 id: "OPT002",
//                 description: `Add 2-3 variations to the ad headline. Follow this framework to come up with 2-3 variations of the FB ad. Once you have the headline variations add them all as headlines for the ad. FB will cycle through them to find out the most effective one.`
//             }
//         ],
//         followUpOptimizations: [
//             {
//                 id: "OPT003",
//                 question: "I'm busy these days...How long do I have to come up with these new video ad versions?",
//                 answer: `That is completely up to you and your team. Faster teams can come up with several ad variations in less than a week, but others take longer. If you find yourself in a situation where coming up with ad variations might take longer to produce, we recommend immediately lowering the budget for this FB campaign and not bring it back until the new video ads are up and ready to roll out.`,
//                 isExpanded: false
//             },
//             {
//                 id: "OPT004",
//                 question: "How long should I be running this for?",
//                 answer: `Once you hit 'Track Optimization' we'll follow up on you to implement this change and track its performance, then we'll let you know how it went.`,
//                 isExpanded: false
//             }
//         ]
//     },
//     {
//         id: "AL002",
//         title: "CTR (outbound) on ad [ABCDE] is too low, while video stop rate is average or above.",
//         description: `Video ad [ABCD] is doing an acceptable job at stopping people and getting them to watch but the number of people who click on the call-to-action link provided after viewing your ad is lower than expected (CTR outbound too low)`,
//         isExpanded: false,
//         followUpQuestions: [
//             {
//                 id: "FU001",
//                 question: "What part of the video should I change then, if the first part is working fine?",
//                 answer: "You should change the first part of the video to make it more engaging and interesting.",
//                 isExpanded: false
//             }
//         ],
//         optimizations: []
//     },
//     {
//         id: "AL003",
//         title: "CTR (outbound) on ad [ABCDE] is too low, while video stop rate is average or above.",
//         description: `This means the video ad did not do a good job at getting people to stop scrolling. Since 
//             this the first the ad needs to accomplish, this will have effect on everything else 
//             downstream. Stop rate is earliest significant metric of your relationship with your clients. 
//             So you are likely to see lower performance on all the rest of later metrics.

//             **Potential causes:**
//             1. Your hook is not compelling enough. What you are saying and/or showing on the 
//             screen text does not move the viewers to stop.
//             2. The video is taking too long to deliver the 'hook' (visual and verbal element that 
//             stops scrolling). The 'hook' should be delivered during the first 3 seconds of the 
//             video.
//             3. The audience you've chosen for your ads is too narrow and what you say is not 
//             exactly what interests them`,
//         isExpanded: false,
//         followUpQuestions: [
//             {
//                 id: "FU001",
//                 question: "How can I know what's compelling for my audience or not?",
//                 answer: `This is determined by how much is known about the audience. In your case, since 
//                         there is direct contact with your prospects and clients, the best way is to ask them
//                         verbally what matters to them the most now.

//                         Most of the time the answers will be big and profound, issues like I want to stop 
//                         feeling/being/spending [blank], but that thought needs to distilled into something 
//                         much smaller you can help them solve quickly during an initial interaction.

//                         At this point we only want to open the relationship with a quick win, so the 
//                         problem/desire expressed by your clients needs to be broken down to the 
//                         smallest valuable unit.`,
//                 isExpanded: false
//             }
//         ],
//         optimizations: [
//             {
//                 id: "OPT001",
//                 description: `Replace the video with a new 2 or 3 video variations following the Video ad content framework but keep the beginning ('hook') part. Here's an [Example 1] of what a video for cold campaigns is supposed to look like. Once the videos are ready, go to the ad campaign and create a new ad with the videos, keep using the same text to accompany the ad. Only the videos need to be replaced.`
//             }
//         ]
//     },
//     {
//         id: "AL006",
//         title: "Optin rate for paid lead magnet landing page [ABC.com] is too low.",
//         description: `This happens when the landing page fails to compel visitors to take the next step like providing 
//         a piece of personal data (email address and/or phone number) while buying the lead magnet. 
//         Having a low opt-in rate reduces your ability to grow your list of leads and reduces the chances 
//         of converting more visitors into first time buyers.

//         **Potential causes:**
//         1. Incongruencies between the previous step (ads or articles) and what is presented on the landing page.
//         2. The offer presented on the page is not compelling visitors to opt in or make an initial purchase.`,
//         isExpanded: false,
//         followUpQuestions: [
//             {
//                 id: "FU001",
//                 question: "What do you mean by list of leads?",
//                 answer: `List of leads refers to the accumulation of contacts (and their contact information) as a result of your marketing activities to promote your products and services.`,
//                 isExpanded: false
//             },
//             {
//                 id: "FU002",
//                 question: "What are you using as a comparison to say that the optin rate is low?",
//                 answer: `Good question, the benchmarks for all marketing metrics are the results of shared pooled data of other companies running marketing campaigns in your industry. This data is dynamically refreshed on a weekly basis.`,
//                 isExpanded: false
//             }
//         ],
//         optimizations: [
//             {
//                 id: "OPT006",
//                 description: `Replace the headline in the Landing Page with a different one, here are a few examples:
//                 - Follow this framework to build an effective landing page that generates leads (opt-ins).
//                 - For reference, here are few examples you can use for inspiration: [Paid lead magnet Examples]`
//             }
//         ]
//     },
//     {
//         id: "AL008",
//         title: "Optin rate for free lead magnet landing page [ABC.com] is too low.",
//         description: `This happens when the landing page fails to compel visitors to take the next step like providing 
//             a piece of personal data (email address and/or phone number) in exchange for the free lead 
//             magnet. Having a low opt-in rate reduces your ability to grow your list of leads and reduces the chances 
//             of converting more visitors into first time buyers.

//             **Potential causes:**
//             1. Incongruencies between the previous step (ads or articles) and what is presented on the landing page.
//             2. The offer presented on the page is not compelling visitors to opt in or make an initial purchase.`,
//         isExpanded: false,
//         followUpQuestions: [
//             {
//                 id: "FU001",
//                 question: "What do you mean by 'lead magnet'?",
//                 answer: `That's a popular name used in marketing to refer to a product that is offered at low or no cost to landing page visitors in exchange for their contact information, and their authorization to contact them later.`,
//                 isExpanded: false
//             },
//             {
//                 id: "FU002",
//                 question: "What do you mean by list of leads?",
//                 answer: `List of leads refers to the accumulation of contacts (and their contact information) as a result of your marketing activities to promote your products and services.`,
//                 isExpanded: false
//             },
//             {
//                 id: "FU003",
//                 question: "What are you using as a comparison to say that the optin rate is low?",
//                 answer: `Good question, the benchmarks for all marketing metrics are the results of shared pooled data of other companies running marketing campaigns in your industry. This data is dynamically refreshed on a weekly basis.`,
//                 isExpanded: false
//             }
//         ],
//         optimizations: [
//             {
//                 id: "OPT001",
//                 description: `Replace the headline in the Landing Page with a different one, here are a few examples:
//                 - Follow this framework to build an effective landing page that generates leads (opt-ins).
//                 - For reference, here are few examples you can use for inspiration: [Paid lead magnet Examples]`
//             }
//         ]
//     }
// ];
export const Alerts = [
    {
        id: "AL001",
        title: "CTR (outbound) too low, while video stop rate is average or above.",
        description: `This means the video ad is doing an acceptable job at stopping people and getting them 
to watch but the number of people who click on the call-to-action link provided after 
viewing your ad is lower than expected (CTR outbound too low).

Potential causes:
1. Video content might not be compelling. Meaning ad viewers don't stay watching 
long enough to be compelled to click on the call-to-action button. They won't 
move on to the next step because they are cold to begin with and by not 
watching the video there is no change they will care enough about what comes 
next after the ad.
2. Call-to-action text may not be clear enough. It means they are watching enough 
of the video but they are not sure if they want to click the call-to-action button.`,
        isExpanded: false,
        followUpQuestions: [
            {
                id: "FU001",
                question: "Why does CTR matter?",
                answer: `CTR (outbound) is one of the earlier indicators of success in an Ads campaign. Having fewer people click on your call-to-action link means there will be less potential visitors to convert, causing downstream problems.`,
                isExpanded: false
            },
            {
                id: "FU002",
                question: "I think the video on the ad is compelling, why can't we just keep it?",
                answer: `This appears to have reached **[xxxx]** people already in the last **[xxxx]** days, so we can safely say it's not an ad worth keep putting money on.`,
                isExpanded: false
            },
            {
                id: "FU003",
                question: "What part of the video should I change then, if the first part is working fine?",
                answer: "Check out the proposed optimizations listed for you.",
                isExpanded: false
            }
        ],
        optimizations: [
            {
                id: "OPT001",
                description: `Replace the video with a new 2 or 3 video variations following the Video ad content framework but keep the beginning ('hook') part. Here's an [Example 1] of what a video for cold campaigns is supposed to look like. Once the videos are ready, go to the ad campaign and create a new ad with the videos, keep using the same text to accompany the ad. Only the videos need to be replaced.`
            },
            {
                id: "OPT002",
                description: `Add 2-3 variations to the ad headline. Follow this framework to come up with 2-3 variations of the FB ad. Once you have the headline variations add them all as headlines for the ad. FB will cycle through them to find out the most effective one.`
            }
        ],
        followUpOptimizations: [
            {
                id: "OPT003",
                question: "I'm busy these days...How long do I have to come up with these new video ad versions?",
                answer: `That is completely up to you and your team. Faster teams can come up with several ad variations in less than a week, but others take longer. If you find yourself in a situation where coming up with ad variations might take longer to produce, we recommend immediately lowering the budget for this FB campaign and not bring it back until the new video ads are up and ready to roll out.`,
                isExpanded: false
            },
            {
                id: "OPT004",
                question: "How long should I be running this for?",
                answer: `Once you hit 'Track Optimization' we'll follow up on you to implement this change and track its performance, then we'll let you know how it went.`,
                isExpanded: false
            }
        ],
        keywords: [
            {
                id: "KW001",
                keyword: "Video ad content framework",
                context: "This is a context for the keyword."
            }
        ]
    },
    {
        id: "AL002",
        title: "Video stop rate for Ad [12345] is too low.",
        description: `This means the video ad did not do a good job at getting people to stop scrolling. Since this the first the ad needs to accomplish, this will have effect on everything else downstream. Stop rate is earliest significant metric of your relationship with your clients. So you are likely to see lower performance on all the rest of later metrics.

            Potential causes:
            1. Your hook is not compelling enough. What you are saying and/or showing on the screen text does not move the viewers to stop.
            2. The video is taking too long to deliver the 'hook' (visual and verbal element that stops scrolling). The 'hook' should be delivered during the first 3 seconds of the video.
            3. The audience you've chosen for your ads is too narrow and what you say is not exactly what interests them.`,
        isExpanded: false,
        followUpQuestions: [
            {
                id: "FU001",
                question: "How can I know what's compelling for my audience or not?",
                answer: `This is determined by how much is known about the audience. In your case, since there is direct contact with your prospects and clients, the best way is to ask them verbally what matters to them the most now.

                        Most of the time the answers will be big and profound, issues like I want to stop feeling/being/spending [blank], but that thought needs to distilled into something much smaller you can help them solve quickly during an initial interaction.

                        At this point we only want to open the relationship with a quick win, so the problem/desire expressed by your clients needs to be broken down to the smallest valuable unit.`,
                isExpanded: false
            }
        ],
        optimizations: [
            {
                id: "OPT003",
                description: `Reshoot 3-5 hooks that would work well with the rest of the video. Then create different variations of the original video where the hook is the only difference between them.`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL003",
        title: "Engagement rate in ads [ABC, DEF, GHI] is below average",
        description: `This happens when your nurturing ad is not generating enough:

            * Post shares
            * Post reactions
            * Post saves
            * Post comments
            * 3-second video plays
            * Photo views
            * Link clicks

            Potential cause:
            Generally, 60%+ of all engagement comes from Post Reactions. If engagement is low, a common cause is that your audience doesn't want to 'react' to the content of the video. And since most reactions are emotional expressions, it's safe to assume the video is not evoking an emotional reaction in the audience.`,
        isExpanded: false,
        followUpQuestions: [],
        optimizations: [
            {
                id: "OPT004",
                description: `Replace the videos with other nurturing video ads. When it comes to nurturing the important thing is to focus on building a relationship with your audience.`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL004",
        title: "Opt-in rate for paid lead magnet landing page [ABC.com] is too low.",
        description: `This happens when the landing page fails to compel visitors to take the next step like providing a piece of personal data (email address and/or phone number) while buying the lead magnet. Having a low opt-in rate reduces your ability to grow your list of leads and reduces the chances of converting more visitors into first time buyers.

            **Potential causes:**
            1. Incongruencies between the previous step (ads or articles) and what is presented on the landing page.
            2. The offer presented on the page is not compelling visitors to opt in or make an initial purchase.`,
        isExpanded: false,
        followUpQuestions: [
            {
                id: "FU001",
                question: "What do you mean by list of leads?",
                answer: `List of leads refers to the accumulation of contacts (and their contact information) as a result of your marketing activities to promote your products and services.`,
                isExpanded: false
            },
            {
                id: "FU002",
                question: "What are you using as a comparison to say that the optin rate is low?",
                answer: `Good question, the benchmarks for all marketing metrics are the results of shared pooled data of other companies running marketing campaigns in your industry. This data is dynamically refreshed on a weekly basis.`,
                isExpanded: false
            }
        ],
        optimizations: [
            {
                id: "OPT006",
                description: `Replace the headline in the Landing Page with a different one, here are a few examples:
                - Follow this framework to build an effective landing page that generates leads (opt-ins).
                - For reference, here are few examples you can use for inspiration: [Paid lead magnet Examples]`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL005",
        title: "Conversion rate for paid lead magnet on landing page [ABC.com] is too low.",
        description: `This happens when you are not converting enough visitors into buyers of the lead magnet.

            Potential cause:
            The most common cause of low conversion of cold audiences at this point of the relationship is a low value-to-cost ratio. Because this campaign is targeting a cold audience and lead magnet is not free, that first conversion is going to be the most difficult of the whole relationship. So, the value expected has to be huge compared with the price they are paying. If the lead magnet fails to do that, then conversions are almost certain to be low.`,
        isExpanded: false,
        followUpQuestions: [],
        optimizations: [
            {
                id: "OPT007",
                description: `Change the lead magnet so the perceived value is at least 5X higher than the cost, preferably 10X or more.`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL006",
        title: "Opt-in rate for free lead magnet landing page [ABC.com] is too low.",
        description: `This happens when the landing page fails to compel visitors to take the next step like providing a piece of personal data (email address and/or phone number) in exchange for the free lead magnet. Having a low opt-in rate reduces your ability to grow your list of leads and reduces the chances of converting more visitors into first time buyers.

            Potential causes:
            1. Incongruencies between the previous step (ads or articles) and what is presented on the landing page.
            2. The offer presented on the page is not compelling visitors to opt in or make an initial purchase.`,
        isExpanded: false,
        followUpQuestions: [
            {
                id: "FU001",
                question: "What do you mean by 'lead magnet'?",
                answer: `That's a popular name used in marketing to refer to a product that is offered at low or no cost to landing page visitors in exchange for their contact information, and their authorization to contact them later.`,
                isExpanded: false
            },
            {
                id: "FU002",
                question: "What do you mean by list of leads?",
                answer: `List of leads refers to the accumulation of contacts (and their contact information) as a result of your marketing activities to promote your products and services.`,
                isExpanded: false
            },
            {
                id: "FU003",
                question: "What are you using as a comparison to say that the optin rate is low?",
                answer: `Good question, the benchmarks for all marketing metrics are the results of shared pooled data of other companies running marketing campaigns in your industry. This data is dynamically refreshed on a weekly basis.`,
                isExpanded: false
            }
        ],
        optimizations: [
            {
                id: "OPT008",
                description: `Replace the headline in the Landing Page with a different one. Follow this framework to build an effective landing page that generates leads (opt-ins).`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL007",
        title: "Conversion rate on OTO page [ABC.com/upgrade] is too low, while the Landing Page opt-in rate is strong.",
        description: `This happens when the number of people who end up buying the offer on the OTO page from all those who visit the OTO page after opting-in to the Lead Magnet is too low.

            Potential causes:
            1. 'Cold direct response' ads campaigns might not bringing in people who have buying intent.
            2. The OTO page is failing to compel visitors to take the next step and make an initial purchase.`,
        isExpanded: false,
        followUpQuestions: [
            {
                id: "FU001",
                question: "What's opt-in rate?",
                answer: `It's the percentage of visitors who end up providing you with their contact information once they land on the page, we call those people leads. The formula is: (All leads / All visitors to the page) x 100%. This is usually measured during a time period.`,
                isExpanded: false
            },
            {
                id: "FU002",
                question: "Why is conversion rate on an OTO page important?",
                answer: `Because the offer in the OTO page is the first paid offer we're presenting in this funnel. Failing to convert a good number of visitors will lower the Average Order Value per person and make the whole campaign less likely to be profitable.`,
                isExpanded: false
            }
        ],
        optimizations: [
            {
                id: "OPT009",
                description: `Check the product you are pitching on the OTO page, does it follow these guidelines?`
            },
            {
                id: "OPT010",
                description: `There doesn't seem to be a progress bar on this page that shows visitors the continuity of the journey. Add a progress bar at the top following any of these examples.`
            },
            {
                id: "OPT011",
                description: `OTO page appears to be 8 full page scrolls long, the ideal length for this pages is shorter, at around 5 full scrolls. Do your best to condense the page content to something closer to 5 full scrolls.`
            },
            {
                id: "OPT012",
                description: `I couldn't detect a Video Sales Letter on the page, it's important to communicate with potential buyers over video in addition to the text on the page. 72% of buyers are visual learners, they need that stimulus to trust your business more.`
            },
            {
                id: "OPT013",
                description: `The text on the Call to Action (CTA) buttons could use a bit more positive emotion that will get more people to click on it. Follow these CTA formulas.`
            },
            {
                id: "OPT014",
                description: `There is no timer detected on this OTO Page. Add a 10-minute timer to encourage quick decisions.`
            },
            {
                id: "OPT015",
                description: `There are no testimonials detected on this page. They are fundamental to build trust at this point of the relationship. Add testimonials following these guidelines.`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL008",
        title: "Conversion rate on 2nd OTO page [XYZ] is too low.",
        description: `This happens when visitors fail to make a 2nd purchase after making a first purchase at a first OTO page.

            Potential causes:
            1. The price increase from the 1st OTO to the 2nd OTO is too steep.
            2. The 2nd OTO page fails to convert users to take action.
            3. The 2nd OTO offer is not a product the audience wants.`,
        isExpanded: false,
        followUpQuestions: [],
        optimizations: [
            {
                id: "OPT018",
                description: `A price of $XX for the offer on the first OTO was detected, while the 2nd OTO is priced at $[YYY]. That's a jump of ZZZ %. Increasing the price so drastically from one step to the next affects conversion. Consider lowering the price of the offer on the 2nd OTO to less than 3 times that of the first offer.`
            },
            {
                id: "OPT019",
                description: `Check the product you are pitching on the 2nd OTO page, does it follow these guidelines?`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL009",
        title: "Open rate for Follow up Email sequence [HIJK] is too low.",
        description: `This happens when not enough email recipients open the emails sent as part of the follow up sequence that aims to build trust and get them to buy the OTO they ignored while they were on the funnel.`,
        isExpanded: false,
        followUpQuestions: [],
        optimizations: [
            {
                id: "OPT024",
                description: `Change the subject lines, follow these examples.`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL010",
        title: "Conversion rate for Follow up Email sequence [HIJK] is too low, while your opening rate is not bad.",
        description: `This happens when you get enough people reading your emails in the sequence but they are not moved to take action and buy the OTO.`,
        isExpanded: false,
        followUpQuestions: [],
        optimizations: [
            {
                id: "OPT025",
                description: `Change the email content so it provides overwhelming value before asking for the sale in the P.S. Make sure you follow this structure.`
            }
        ],
        followUpOptimizations: []
    },
    {
        id: "AL011",
        title: "Your Instant Gross Profit for campaign [ABCDE] is too low",
        description: `This happens when the average order value (AOV) of your new leads is significantly lower than the Cost per Acquisition.

            Potential causes:
            1. Your average order value is too low.
            2. Your cost per acquisition is too high.`,
        isExpanded: false,
        followUpQuestions: [],
        optimizations: [
            {
                id: "OPT026",
                description: `The Average Order Value (AOV) has declined by xxx % since [date] until today and that is causing the Instant Gross Profit to become more negative. A lower AOV is the results of a lower conversion rate on OTO 1 and OTO 2. This has been reported on Alert [007] and [008].`
            },
            {
                id: "OPT027",
                description: `The Average Order Value (AOV) is holding steady in the last XXX weeks, but the Cost per Acquisition (CPA) has been climbing up. That's bringing the IGP down. The higher CPA is being caused by a drop in CTR for cold campaigns, reported in Alert [001].`
            }
        ],
        followUpOptimizations: []
    }
];