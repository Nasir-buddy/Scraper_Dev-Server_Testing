

Industry: Expertise/knowledge

Table of content:

1. Preparation before running Ad campaigns
2. How to come up with effective Ad Creatives (Videos and Images)
3. Objective: Getting new clients

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Preparation before running Ad campaigns

Meta:

### 1. Set Up Tracking

**Step 1: Domain Verification**
Meta needs to know who are your buyers and leads so they can optimize your ads. The best way to let Meta know about conversions on your page is by combining 2 methods: Metal Pixels and Meta Conversions API. Meta will only accept incoming data from a verified domain. Here’s how to [verify your domain in Meta Business Manager](https://www.facebook.com/business/help/286768115176155?id=199156230960298).

**Step 2: Event Tracking and Forwarding**
We need to start collecting certain events like visitors, leads and customers.

There are several ways to send data back to Meta, it depends on if you have a simple or complex funnel.
A few companies were lucky enough to be able to grow their client acquisition with a very simple marketing campaign or funnel.

However that is not the case for most companies, where every opportunity for profit has to be maximized.

1. Tracking on a Simple funnel (Example: 1 Opt in, 1 checkout page and 1 confirmation page. Simple Ecommerce funnel - Product page, checkout page, confirmation page ). If you have a simple funnel, use Google Tag Manager to [install Meta pixels](https://www.facebook.com/business/help/952192354843755?id=1205376682832142) and [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gtm-server-side/) on your pages and send conversion events (page view, leads, purchases, etc.)
2. Tracking in more Complex funnels (Example: 1 Opt in, 1 checkout page, 2 upsell pages, 1 confirmation page).
   For most businesses, the way of maximizing results is by exploiting every potential opportunity to increase the Average Order Value (AOV) and Lifetime value (LTV). That means that funnels and campaigns tend to get more complex over time. It is fundamental that we send the correct signal to the ads platform.

In more complex funnels, we might miss sending some of the purchases to Meta pixel using Google Tag manager. So, instead we can use a [webhook](https://www.redhat.com/en/topics/automation/what-is-a-webhook) available in the payment gateway where a purchase happens, and an automation tool like Zapier or Make to send data back to Meta pixel using Conversions API.

For example, you are using Stripe as a payment tool and Make as an automation tool. Follow below steps to send data back to Facebook pixel.

* 1. Create a new scenario in Make.
  2. Set up Stripe “**Watch Events**” as a Trigger (by doing this whenever a purchase happens in Stripe this scenario will be triggered by Stripe with purchase information. Stripe Purchase information includes customer email, customer name, customer address, product name, product price etc. )
  3. Now add **Facebook conversion API with Send Events** as a next step. and fill out Pixel Id and data (Stripe purchase information) to be sent back to Facebook Pixel.

In this method, any payment tool that provides webhook service can be used.

**Step 3: Event Testing**
Once you have tracking set up, make sure to test to make sure they are working correctly before starting your ads campaign. Here’s how to test that events are received correctly [using Meta Events Manager](https://www.facebook.com/business/help/2040882565969969?id=1205376682832142).

In case you sign up clients with methods that are not online (for example collecting payments at a physical event), you can upload your offline conversions to Meta in order to take the benefits such as measure the offline return on your ad spend..etc. Find the [best method](https://www.facebook.com/business/help/1142103235885551?id=565900110447546) to upload events. Here are [some Partner tools](https://www.facebook.com/business/help/1278167592274041?id=565900110447546) to integrate. We recommend using [Zapier](https://zapier.com/apps/facebook-offline-conversions/integrations).

### 2. Set Up Your Audiences

There are several audiences that you need to set up before running ads.

**Set up a ‘Broad’ audience**

This is an audience targeting where we do not set up specific filters in Meta. Instead we let the ad creatives attract the buyers. Meta will use the data gathered to optimize the ad campaign and find more people with similar interests.

Intuitively you would think by creating lots of filters in Meta you would get better results. But what Meta needs is a big pool of people. They can target specific groups from that pool and let the machine learning algorithm do the targeting.

**Set up an ‘Engagement’ audience:**

This is a group of people who have done any engagement with your content on Meta, i.e. clicked “read more” on your ad, clicked “like”, watched your video.

Running ads on Meta are good for reaching new people who have never heard of you or your business. So you want to get these people to know, like and trust you by creating nurturing content ads.

These people are warmer and you can target them later on with your self liquidating offer (SLO) funnels.

Here’s how to set up an audience of your [engagers on Facebook](https://www.facebook.com/business/help/221146184973131?id=2469097953376494) and [engagers on Instagram](https://www.facebook.com/business/help/214981095688584?id=2469097953376494) and [video viewers](https://www.facebook.com/business/help/1099865760056389?id=2469097953376494)

For each audience, create 3 versions with different “Audience retention” - 30 days, 60 days and 90 days.

**Set up a ‘Leads’ audience**

This audience consists of your leads from your CRM.

It serves 3 purposes:

1. As an exclusion list so we can get our ads to reach new prospects
2. To create a lookalike audience, which we will talk about more later on
3. To run retargeting ads

There are several Leads audiences to create:

1. All your leads
2. One audience for each of your funnels. This will help to be very specific in your targeting, who you want to show your ads to and who you want to exclude.
3. Time bounded audience for each of your funnels. For example, leads in the last 30 days, 60 days. This is useful to show different ads based on time so that your ads don’t suffer from fatigue.

There are several ways to connect your leads from CRM into Meta Audience.

1. If your CRM has a direct sync with Meta, that is a simple way to set it up.
2. Alternatively, you can use tools like Make.com and Zapier to add every new lead’s email into the Meta audience.

**Set up a ‘Buyers’ audience**

This audience consists of your buyers from your CRM.

It serves 2 purposes:

1. As an exclusion list so we can get our ads to reach new prospects
2. To create a lookalike audience, which we will talk about more later on

There are several Buyers audiences to create:

1. All your buyers
2. One audience for each of your funnels. This will help to be very specific in your targeting, who you want to show your ads to and who you want to exclude.

To connect your buyers from CRM to Meta Audience, use the same procedure that you used for your leads.

**Set up a Lookalike audience of your ‘leads and buyers’ audience**

We want to use Meta’s machine learning algorithm to find us people who closely match our leads and buyers. This is an audience targeting that we will use to test in our campaigns.

You want to set up several audiences using these audience source:

1. All buyers from CRM
2. All leads from CRM
3. Leads from each of your funnels (one audience per funnel)
4. Buyers from each of your funnels (one audience per funnel)

Meta gives you options (1% - 10%) to choose how closely you want the lookalike audience to match the audience source.

1% means it is a close match but your audience size could be smaller.

The larger percentage means you are reaching a broader group of people, but a lesser match.

As our goal with this audience is to reach new people who have never heard of you, we want a balance of match, while also reaching a big enough audience size. Typically, we start at 3% lookalike and aim to get an audience size at least 50 million.

**Set up a ‘Page-specific visitors’ audience**

This audience is created using the Meta pixel installed on your funnels. This is used to:

1. Run retargeting ads
2. As an exclusion list so we can get our ads to reach new prospects

For each of your funnels, create 3 specific audiences for your landing page.

Choose the event “People who visited specific web pages”, then enter your landing page URL.

For “Audience retention”, choose:

* 30 days (used for retargeting ads)
* 60 days (used for retargeting ads)
* 180 days (used for exclusion)

Here is more detail on how to [set up page specific visitors audience](https://www.facebook.com/business/help/1474662202748341).

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## How to come up with effective Ad Creatives (Videos and Images)

### The Perfect Ad video or image

The perfect ad video or image doesn’t exist. Instead, produce a volume of ads that could appeal to different types of people in your audience.

### Dimensions

For every video and image ads, create 4 different dimensions so that Meta can place your ads in as many placements and give you more exposure.

When you are shooting your video, **make sure it is wide enough so that it can be cropped** into the dimensions below.

* 1920 x 1080
* 1080 x 1080
* 1080 x 1920
* 1080 x 1350

### Formats

These are the [supported video file formats.](https://www.facebook.com/business/help/1640701476174343?id=603833089963720) We recommend using mp4 or mov.

These are the [supported image file formats](https://www.facebook.com/business/help/523719398041952?id=1240182842783684). We recommend using jpg or png.

### Video content

**Video Ads Content Framework**

The framework is an extremely effective method of grabbing someone's attention, making a single point, building a case around that point, and inviting them to take action on it. Of all the content frameworks I've seen, this one is by far the most efficient at getting your message into the world and rallying people to your cause.

Here's how it works:

First, you're going to do something to stop the scroll and grab your ideal audience's attention. This is called the (1) **hook**.

Then you're going to give them some short (2) **background information or context**.

Next, you'll (3) **share three quick tips or points** and then (4) **wrap up with a call to action**.

**Bonus tip** there's a secret word that, when used in your hook, is proven to increase engagement and watch time. Want to know what it is? The word is **‘You’**. By using the word you in your hook, you make the video immediately relevant to the viewer, which makes them way more interested.

Let me break it down part by part and help you put your first video together along the way.

1. **Hook**

Hook is the most important part of your video because it's how you're going to grab the viewer's attention.

In fact, when people ask me why their content isn't performing, the first thing I always look at is their hook. When people are consuming social media, they're usually just scrolling endlessly on their phones.

Your hook has to get them to stop scrolling and pay attention to what you're about to say. If you skip the hook and just start telling the story, people will just scroll to the next video in their feed. So in the first 3 seconds of the video, you need to be intentional about what you say to ensure they keep watching.

Examples:

Here are some of the best hooks to use:

1. The #1 secret to \_\_\_\_\_\_\_\_\_\_\_\_\_ is…
2. Here’s how to \_\_\_\_\_\_\_\_\_\_\_\_…
3. If you’re struggling with \_\_\_\_\_\_\_\_\_, this is your problem…
4. Did you know…
5. How to \_\_\_\_\_\_\_ without \_\_\_\_\_\_\_…
6. This is probably going to ruffle some feathers…
7. Everything you knew about \_\_\_\_\_\_\_\_\_\_\_\_\_\_ is wrong…
8. Here are 3 tips to \_\_\_\_\_\_\_\_\_\_\_\_\_…
9. Here’s one simple hack to \_\_\_\_\_\_\_\_\_\_\_\_\_\_…
10. Don’t make this mistake…
11. Here’s the secret to \_\_\_\_\_\_\_\_\_\_\_\_\_…

**2. The Context**

This is where you give your viewer the context or the story behind what you're about to tell them. This is crucial because it shows them why they should keep listening. Stories give us context and meaning, which captivates our attention. Once our brains get into a story, we have to finish it. So while the hook grabs the audience's attention, this part makes sure you keep it. Make it one or two quick sentences. We're talking 60 to 90 seconds for the whole video, so you don't have time to tell your whole life story.

Context Examples

1. So a few weeks ago… [tell a story of how you learned this principle]
2. Too many people do \_\_\_\_\_\_\_\_\_ when they should do \_\_\_\_\_\_\_\_\_\_\_ [give the context of what they should do instead]
3. In the book \_\_\_\_\_\_\_\_\_\_\_\_ by \_\_\_\_\_\_\_\_\_\_\_, it says… [share a quote from the a book]
4. A study by \_\_\_\_\_\_\_\_\_\_\_\_\_ showed… [give a statistic or research result]
5. People always ask me… [answer a question that you get asked a lot]
6. So I know this might sound crazy, but… [tackle a false belief you know they’ll have about your content]

**3. The 3 Points**

Don’t need to make your audience wait to get some actual value, give them your top three points or tips that will help them get the result they're looking for. This is the meat of your content.

You don't have time to go into depth, and besides, your audience doesn't really want you to. You're just looking for little bites of information. Simply name each of the three points and briefly explain what it is in one sentence. This works really well in this format because people are just dying to know what number three is and they have to watch the whole video to find out.

In a short form video, you'll need to explain each point briefly. If it is a long form video, you have time for more details. Sometimes you'll want to share more than three points, which is totally fine, but you'll need to adjust your pace to keep it within the time frame.

Now say…

* #1 is \_\_\_\_\_\_\_\_\_\_\_\_\_\_. [briefly explain]
* #2 is \_\_\_\_\_\_\_\_\_\_\_\_\_\_. [briefly explain]
* #3 is \_\_\_\_\_\_\_\_\_\_\_\_\_\_. [briefly explain]

**4. The CTA (Call To Action)**

You should always end your videos with some sort of CTA. This is an invitation to the viewer to take action on what you taught them. Without it, your content will feel empty, like you taught them something valuable but didn't tell them what to do with it. If your goal is to get people to do something, then invite them to take action. This is also where you can invite people to engage with you, join your email list or check out one of your products.

Note: For nurturing campaigns, there is no direct response selling, but you can ask them to keep engaging with you on the current ad or stay tuned for more upcoming videos.

**Here's the script.**

So if you're an [insert target market name] and you want to [get insert result or benefit], make sure to [insert fill in one of the examples below]...

* Invite them to do the thing you just taught them
* Follow for more tips
* Follow the link to get \_\_\_\_\_\_\_\_\_\_.
* Go to \_\_\_\_\_\_\_\_\_\_.com to get \_\_\_\_\_\_\_\_\_\_\_.
* Comment \_\_\_\_\_\_\_\_\_ below and I’ll send you \_\_\_\_\_\_\_\_\_.
* DM me \_\_\_\_\_\_\_\_\_\_\_ and I’ll show you how.

**Examples:**

Put it all together…

1. Hook
2. Context
3. 3 tips or points
4. Call To Action (CTA)

| Hook | Context | Tips | | |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
| “Sell you your business and they pay you for it” | “Seller Financing and what you need to tell them” | “#1 pay with profits from business” | “#2 pay the taxes out of the sale spread out over 10 years” | “#3 it can be really fast this way” |

[Video link]

| Hook & Context | Tips | |
| --- | --- | --- |
|  |  |  |
| Attention grabbing hook | Provide the 4 reasons | |

[Video link]

### How to create many ad video variations fast:

You can easily create various types of ads by adding a different hook to the same video. Thus creating several different variations off of a single finished video ad.

A Hook is an ‘attention grabbing mechanism’ that could be what you say, but also the visuals. Basically, anything that will grab attention and draw someone into the video. Visuals are important because many people watch videos without sound.

**Visuals for Videos**

Visuals are important to grab attention. Many people watch videos without audio. The videos have to look different. And the visuals need to be eye-catching.

You can either shoot in different locations or use a green screen to change it.

If all of the videos all appear the same at a glance, when seen often enough will trick people into thinking they have seen the ad. So they skip and don’t take the time to watch the rest of the video.

**Video shooting procedure:**

For each video concept, film 3 hooks. This is how you can do it faster and simpler:

Choose one of the hooks and use it to shoot one full video ad.

Then, go back and re-film just the hook part, the first 5-10 seconds. This way you have one idea with three different hooks to attract viewers into watching the remainder of the video. The other two hooks will be edited to create a total of three videos with the only thing being different are the hooks.

Then move on to the next video concept.

Examples:

[links]

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Objective: Getting new clients

### Context:

* There are different ways of getting new clients. Some are more aggressive, while others are more conservative. Budget is very important to define which way to go. For small and medium businesses without big funding, the recommended growth method is ‘bootstrapping with paid ads’. Which means growing your client base with paid ads and making your AoV and LTV to pay for your ad budget in the shortest possible time.
* This method of getting new clients works best when you already have an offer that has been selling in the market with relative success and you need to scale it.
* To get more clients effectively, you will need to run ads and have a set of pages to convert that traffic into clients (a.k.a. Funnel or online shop) so please make sure you cover the section: [Preparation before running Ad campaigns].
* Follow the items below to get more clients using this method.

### Run ads to get more traffic

* Meta ads are good for getting you and your offer in front of new people, who have never heard of you. The goal here is to convert that cold traffic through a funnel or online shop and email sequences.
* Here are the different types of campaigns to set up in order to achieve the goal:

1. **Cold direct response campaign**

**What is it?**

Meta Ads Campaign to reach people who have never heard of you

**Why is it important?**

To grow bootstrapping with paid ads you need to engage and convert people who have never heard of you.

**How do you run it?**

* 1. Create a campaign with “Sales” campaign objective
  2. Create 2 ad sets - one with a “Broad” audience. And the other with a “Lookalike” audience. Exclude the audience of all leads, all buyers and website visitors past 180 days.
  3. For each ad set, add at least 5 ads with different creatives (test different hooks and angles). Each ad should have at least 3 different headlines and 3 different primary text. These ads are direct response and should have a call to action.
  4. The types of creatives that work best are videos. The hook should contain props that are weird or interesting that pique the user’s curiosity. Because audiences are cold, hooks should not be just you or your brand.

Several variations will be needed. Make sure to cover the section [How to create many ad video variations fast]

* 1. Recommended budget to start is $50/day. Among the ad campaigns to get new clients, this should have the biggest share of the budget because the audience pool is bigger.

Cold direct response ads example:

* + <https://www.facebook.com/100044290666193/posts/1144190943733917>
  + <https://www.facebook.com/100044290666193/posts/1144192420400436>
  + <https://www.facebook.com/100044290666193/posts/1144190930400585>
  + <https://www.facebook.com/100044290666193/posts/1144188337067511>

1. **Nurturing campaign to stay top of mind for your audience**
   **What is it?**

Meta Ads Campaign to give more value without asking for an action.

**Why is it important?**

To build “know, like and trust” with people on the Meta platform who has never heard of you. This campaign will put you top of mind with your audience, they understand how you can help them, so they will be more receptive the next time they see your direct response ads.
Since we are not driving people out of the platform, Meta gives us an opportunity to reach these people cheaply.

**How do you run it?**
Create 3 campaigns with the objective of “Awareness”. One for “30 days” audience, one for “60 days” and one for “90 days”. This campaign set up allows us to

* 1. Create 1 ad set for each ad. For the 30 days audience, choose the audience of Facebook engagers, Instagram engagers and Video viewers with the Audience retention of 30 days.
  2. There are 3 types of ad creatives. At minimum, you should have one of each. More is better.
     1. Testimonials - This can be a video testimonial or image with a quote and photo of the person
     2. Informational - Think of this as showing your prospects “How to” solve a problem or achieve a certain result. It doesn’t need to go too deep. But it needs to be something valuable they can’t get for free elsewhere. Video works best for informational creatives.
     3. Behind the scenes - These are video footage that you don’t normally share on social media. Examples:
        + Clients asking you questions off stage during a live event
        + Exclusive VIP lunch session with your clients
        + Clips of how your team and how you run your business
  3. Repeat steps 2 and 3 for “60 days nurturing”. For the audience, choose Facebook engagers, Instagram engagers and Video viewers with the Audience retention of 60 days and exclude audiences with retention of 30 days.
     Note: The creatives shown in this campaign should be different from the “30 days nurturing” campaign
  4. And for the “90 days nurturing” campaign. For the audience, choose Facebook engagers, Instagram engagers and Video viewers with the Audience retention of 90 days and exclude audiences with retention of 60 days.
     Note: The creatives shown in this campaign should be different from the “30 days nurturing” and “60 days nurturing” campaign.

Nurturing ad Examples:

1. [Nurture ads - Business Values](https://app.foreplay.co/share/boards/d110qayNfJbmAjlLLzPU?user=Orvelin%20Valle)
2. [Nurture ads - Personal Values](https://app.foreplay.co/share/boards/QWsHtNyRL8asRP9xn1BD?user=Orvelin%20Valle)
3. [Nurture ads - Testimonials](https://app.foreplay.co/share/boards/7Jac5aMzqDbrWEyVAN5I?user=Orvelin%20Valle)
4. [Nurture ads - Behind The Scenes](https://app.foreplay.co/share/boards/KvCe5FcjjH3ieDRSlyww?user=Orvelin%20Valle)
5. [Nurture ads - Highjacking Media + Value](https://app.foreplay.co/share/boards/5NFGn2PFUR0tgynNIAUK?user=Orvelin%20Valle)
6. [Nurture ads - Education](https://app.foreplay.co/share/boards/mnCESmFg24jJbmFuf6cB?user=Orvelin%20Valle)
7. **Warm Direct response campaign
   What is it?**

Meta Ads Campaign to reach people who are warm and getting them to take an action (opting in to your lead magnet or purchasing an SLO)

**Why is it important?**

This is where we turn the audiences we’ve warmed up in Meta platforms into leads and buyers.

**How do you run it?**

* 1. Create a campaign with “Sales” campaign objective
  2. Create an ad set with the audience: Facebook engagers (60 days), Instagram engagers (60 days), Video viewers (60 days), website/funnel visitors (60 days), leads from this funnel (60 days). Exclude the audience of all buyers.
  3. For each ad set, add at least 5 ads with different creatives (test different hooks and angles). Each ad should have at least 3 different headlines and 3 different primary text. These ads are direct response and should have a call to action.
  4. The types of creatives that work best are videos. The hook should contain you or your brand together with some props that are weird or interesting that pique the user’s curiosity.

Warm direct response ads examples:

* + <https://www.facebook.com/100044290666193/posts/1138536354299376>
  + <https://www.facebook.com/100044290666193/posts/1138536260966052>
  + <https://www.facebook.com/100044290666193/posts/1138533484299663>
  + <https://www.facebook.com/100044290666193/posts/1138536270966051>

### 2. Publish Web Content to complement traffic from paid ads

* Provide overwhelming value with long form content
* Distribute the content to your email list, messenger list, push notification list, outbound list
* Promote your offer using links, banners and pop-ups

### 3. Convert traffic from Paid Ads and Web Content with a Lead Generation Funnel

**What is a Lead Generation Funnel?**

It’s a series of steps in the form of pages that your audience goes through after they click on an ad or piece of content. The intent of these pages is to collect information about your visitors that will then be used to reach them later on. Typically it’s an email address or a phone number.

**Why is it important?**

Most people never take action on something new the first time they are asked. So a large % of your visitors will not take you up on your offer the first time they see it. That’s why you need to build a list of contacts from as many visitors as you can. This is what many specialists refer to as ‘Building your list’

**How to build an effective lead generation funnel?**

Landing Page

Offer

* The product you are offering should be free or under $50
* Solves a small, urgent problem entirely. By purchasing your offer, the client would feel their problem has been solved. For example, the High Ticket Clients Immersion program covers all the topics on getting high ticket clients - prospecting, qualifying, closing and follow up. Clients also get role play examples and scripts.
* Overwhelming value vs. price (specially if paid)
* Format is easy to consume: Cheatsheet, Blueprint, Short book, Audiobook, Report, Swipe file/Template, Calculator
* If it’s a purchase, add an order bump

Creative (text, video or images)

* If free: 3 full screen scrolls max, if under $50: 10 full screens max
* Headline: Congruent with Ads copy, Ad video, Ad image
* Good looking visual of what the lead will be getting when they opt in
* Big CTA Button above the fold
* (i.e. Media mentions, testimonials)
* Short bio/about us copy

Transition:

* If free, transition to sales page selling an offer under $50
* If paid, transition to Upsell Page

Examples of Landing Pages:

* + <https://highticketclientsbootcamp.com/free-cheatsheet>
  + <https://www.highticketleadfunnels.com/>
  + <https://offersthatselllikecrazy.com/>
  + <https://highticketblueprints.com/>
  + <https://highticketofferformula.com/>

Upsell Page

Offer:

* Solve the next problem they have after purchasing the previous product

Creative (text, video or images):

* Acknowledge the purchase, talk about how to use the product
* Works best with a video at the top
* And transition to the next offer
* Use one-click order buttons so users don’t need to enter their payment info again
* Offer a ‘no-thanks’ link below each button, which triggers a downsell inside a pop-up

Transition:

* One more Upsell page or
* Confirmation page

Examples of upsell pages:

* + <https://highticketclientsbootcamp.com/htclients-marketing-upgrade-now>
  + <https://highticketclientsbootcamp.com/htclients-smart-upgrade-now>
  + <https://www.highticketblueprints.com/bp-fis-upgrade-now>
  + <https://offersthatselllikecrazy.com/offers-hto-live-now>

Follow Up Email Sequence

* Send sequence of emails to those opt-ins that didn’t complete the purchase

Example of follow up email sequence:

* <https://docs.google.com/document/d/1QL5AwOq4h6tETXzzHYjbQd9p2FRoOTmlFMVXQiBTnIs/edit>

### 4. Optimize by testing:

**What is it?**

It means you change something in the way you get or convert your traffic to achieve better results.

**Why is it important?**

Because the process of getting more new clients will never stop and the more you test new things, the more optimized your client acquisitions process will be.

**How to optimize your client acquisition process?**

Optimizing ads:

Follow this workflow

![](data:image/png;base64...)
## \_\_\_\_\_\_\_\_\_IGNORE BELOW THIS LINE\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Objective: Increase client lifetime value

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Objective: Getting more appointments

**Asset: Webinar Page**

Objective:

Offer:

* Mid-ticket product

Creative:

* Do the webinar live until you perfect the pitch, then turn it automated
* Headline that triggers curiosity
* Reminder emails to indoctrinate the leads and remind them to attend the webinar
* Follow up email sequences to people who have not taken your offer

## Objective: Getting more high ticket ascensions

**Asset: Event Funnel**

**Asset: Application Funnel**

Objective:

* Enroll clients into your core offer

Offer:

* High ticket core offer

Audience:

* Attended live or online event

Creative:

* Recap the offer
* Application form with qualifying questions
* (Optional) Checkout form to collect deposit

Bounce rate

Asset: Landing Page

Creative

Offer

Audience

Optimization Flow Chart

<https://docs.google.com/document/d/1UJnFG4ff1cu8OP5ai5npz8S7ScfpK9Eqt1JKkSRFuWk/edit?tab=t.0#heading=h.36m883q3rxav>

## Glossary

Retargeting ads

Video concept


