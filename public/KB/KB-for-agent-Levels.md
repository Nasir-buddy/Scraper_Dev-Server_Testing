

Industry: Expertise/knowledge

Table of content:

1. Preparation before running Ad campaigns
2. How to come up with effective Ad Creatives (Videos and Images)
3. Objective: Getting new clients

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Preparation before running Meta Ad campaigns

Follow these steps to ensure you make the most of your ad spend on Meta ads. Failing to do so will result in lower performance and unclear data.

### 1. Set Up Tracking

**Step 1: Domain Verification**
Meta needs to know who are your buyers and leads so they can optimize your ads. The best way to let Meta know about conversions on your page is by combining 2 methods: Metal Pixels and Meta Conversions API. Meta will only accept incoming data from a verified domain. Here’s how to [verify your domain in Meta Business Manager](https://www.facebook.com/business/help/286768115176155?id=199156230960298).

**Step 2: Event Tracking and Forwarding**
This step is about collecting key events like visitors, leads and buyers.

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

Here’s how to set up an audience of your [engagers on Facebook](https://www.facebook.com/business/help/221146184973131?id=2469097953376494) and [engagers on Instagram](https://www.facebook.com/business/help/214981095688584?id=2469097953376494), [video viewers](https://www.facebook.com/business/help/1099865760056389?id=2469097953376494) and Website visitors.

For each audience, create 3 versions with different “Audience retention” - 30 days, 60 days and 90 days. Name these audiences:

* Facebook Engagement 30 Days
* Instagram Engagement 30 Days
* Video Viewers 30 Days
* Website Visitors 30 Days
* Facebook Engagement 60 Days
* Instagram Engagement 60 Days
* Video Viewers 60 Days
* Website Visitors 60 Days
* Facebook Engagement 90 Days
* Instagram Engagement 90 Days
* Video Viewers 90 Days
* Website Visitors 90 Days

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

### Ad Dimensions

For every video and image ads, create 4 different dimensions so that Meta can place your ads in as many placements and give you more exposure.

When you are shooting your video, **make sure it is wide enough so that it can be cropped** into the dimensions below.

* 1920 x 1080
* 1080 x 1080
* 1080 x 1920
* 1080 x 1350

### Formats

These are the [supported video file formats.](https://www.facebook.com/business/help/1640701476174343?id=603833089963720) We recommend using mp4 or mov.

These are the [supported image file formats](https://www.facebook.com/business/help/523719398041952?id=1240182842783684). We recommend using jpg or png.

### Video content framework

The framework is an extremely effective method of grabbing someone's attention, making a single point, building a case around that point, and inviting them to take action on it. Of all the content frameworks I've seen, this one is by far the most efficient at getting your message into the world and rallying people to your cause.

Here's how it works:

First, you're going to do something to stop the scroll and grab your ideal audience's attention. This is called the (1) **hook**.

Then you're going to give them some short (2) **background information or context**.

Next, you'll (3) **share three quick tips or points** and then (4) **wrap up with a call to action**.

**Bonus tip** there's a secret word that, when used in your hook, is proven to increase engagement and watch time. Want to know what it is? The word is **‘You’**. By using the word you in your hook, you make the video immediately relevant to the viewer, which makes them way more interested.

Let me break it down part by part and help you put your first video together along the way.

1. **Hook**

A hook refers to the first few seconds of your videos ad. And it’s supposed to ‘hook’ your audience so they keep watching the rest of the video.

The main objective is to get them to stop scrolling and pay attention to what you're about to say. If you skip the hook and just start telling the story, people will just scroll to the next video in their feed. So in the first 3 seconds of the video, you need to be intentional about what you say to ensure they keep watching.

Hook formulas:

Here are some of the best hooks to use:

1. What \_\_\_\_ don’t want you to know
2. The #1 secret to \_\_\_\_\_\_\_\_\_\_\_\_
3. If you’re struggling with \_\_\_\_\_\_\_\_\_, this is your problem…
4. How to \_\_\_\_\_\_\_ without \_\_\_\_\_\_\_…
5. Everything you knew about \_\_\_\_\_\_\_\_\_\_\_\_\_\_ is wrong…
6. 3 tips to \_\_\_\_\_\_\_\_\_\_\_\_
7. Don’t make this mistake \_\_\_\_\_\_\_\_\_
8. This might sound absurd but \_\_\_\_\_\_\_\_\_\_
9. Here’s one simple hack to \_\_\_\_\_\_\_\_\_\_\_

Visual examples:

Example 1:

![](data:image/png;base64...)

Example 2:

![](data:image/png;base64...)

**2. The Context**

This is where you give your viewer the context or the story behind what you're about to tell them. This is crucial because it shows them why they should keep listening. Stories give us context and meaning, which captivates our attention. Once our brains get into a story, we have to finish it. So while the hook grabs the audience's attention, this part makes sure you keep it. Make it one or two quick sentences. We're talking 60 to 90 seconds for the whole video, so you don't have time to tell your whole life story.

Context formulas

1. So a few weeks ago… [tell a story of how you learned this principle]
2. Too many people do \_\_\_\_\_\_\_\_\_ when they should do \_\_\_\_\_\_\_\_\_\_\_ [give the context of what they should do instead]
3. In the book \_\_\_\_\_\_\_\_\_\_\_\_ by \_\_\_\_\_\_\_\_\_\_\_, it says… [share a quote from the a book]
4. A study by \_\_\_\_\_\_\_\_\_\_\_\_\_ showed… [give a statistic or research result]
5. People always ask me… [answer a question that you get asked a lot]
6. So I know this might sound crazy, but… [tackle a false belief you know they’ll have about your content]

**3. The Key Points**

Don’t need to make your audience wait to get some actual value, give them your top points or tips that will help them get the result they're looking for. This is the meat of your content.

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

**Video ad examples**

Put it all together…

1. Hook
2. Context
3. 3 tips or points
4. Call To Action (CTA)

| Hook | Context | Tips | | |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
| “Sell you your business and they pay you for it” | “Seller Financing and what you need to tell them” | “#1 pay with profits from business” | “#2 pay the taxes out of the sale spread out over 10 years” | “#3 it can be really fast this way” |

| Hook & Context | Tips | |
| --- | --- | --- |
|  |  |  |
| Attention grabbing hook | Provide the 4 reasons | |

### FB Ads Headline

FB ad frameworks are expected to summary in a single phrase the reason why ad viewers should click on the call-to-action button.

To create an effective FB ads headline follow these guidelines:

* If the product they are going to see in the next step is free or low cost, mention the price in the headline.
* It needs to underline the Big benefit / Big promise for viewers.
* Highlight the Unique Selling Proposition, what makes you different than the rest.
* Align and reinforce the text on the call-to-action button

The more points you hit in the list of guidelines the more effective the ad headline is going to be.

Examples:

* Get a pre-built [something] for only [low price/Free]
* [Number] of [something] or your money back.
* The art of sky scraping: A game changer for high ticket sales.
* Grab your free [something they want]
* [FREE PLAN] Avoid the #1 killer: [something they fear]

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

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Objective: Grow your Leads List

### Important concepts:

* A ‘Leads list’ (a.k.a. just ‘your list’) is a collection of all the potential or current clients who have come in contact with your marketing, have provided you with their contact information and you maintain some form of communication with.
* There are different ways of growing your leads list. Some are more aggressive, while others are more conservative.
* For most companies with revenue under 100 Million USD a year, the recommended method is ‘self-liquidated growth’.
* ‘Self-liquidated growth’ means growing your list by driving traffic to a low ticket product that recovers part or all of your cost of acquisition.
* The low-ticket product we’re discussing here is not your core offer, but rather a complete solution to a narrow problem your audience has that earns you some level of their trust.
* Since most of the initial traffic will come from ads, it’s fundamental to the success of this strategy to prepare your ad account to succeed. There is a dedication section for this called: ‘Preparation before running Ad campaigns’ that needs to be completed before running ads.

### Step 1: Get paid traffic from ads.

* The chosen ads platform is Meta, which is useful for 'interruption marketing'. In other words, getting your brand in front of people who has never heard of you.
* In this step, the goal is to get the Meta audience to engage with your ads, click-through to your landing page and make a first purchase that covers most, if not all, the cost of ads.
* Assuming you have already completed the steps on ‘Preparation before running Ad campaigns’, these are the basic campaigns you need to get traffic from Meta ads:

1. **Cold direct response campaign**

**What is it?**

It’s a Meta Ads Campaign that reaches people who have never heard of you with interesting content that gets them to engage with your ads and click-through to the next step.

**Why is it important?**

To grow your business following a ‘self-liquidated growth’ strategy there needs to be a constant stream of new people engaging and clicking-through your ads.

**Steps to run a Cold direct response campaign**

1. Create a campaign with “Sales” campaign objective
2. Create 2 ad sets - one with a “Broad” audience. And the other with a “Lookalike” audience. Exclude from the audience all leads, all buyers and website visitors older than 180 days.
3. For each ad set, add at least 5 ads with different creatives (test different hooks and angles). What’s an angle and hook? Each ad should have at least 3 different headlines and 3 different primary text. These ads are direct response and should have a call to action.
4. The types of creatives that work best are videos. The hook should contain props that are weird or interesting that pique the user’s curiosity. Because audiences are cold, hooks should not be just you or your brand. Several variations will be needed. If you are not sure you will have time to get this videos done, make sure to cover the section How to create many ad video variations fast
5. Recommended budget to start is $50/day and increase the budget as recommended depending on results. Among the ad campaigns to get new clients, this should have the biggest share of the budget because the audience pool is bigger.

**Examples Cold direct response ads examples:**

* + <https://www.facebook.com/100044290666193/posts/1144190943733917>
  + <https://www.facebook.com/100044290666193/posts/1144192420400436>
  + <https://www.facebook.com/100044290666193/posts/1144190930400585>
  + <https://www.facebook.com/100044290666193/posts/1144188337067511>

1. **Nurturing campaigns**

**What is it?**

Meta Ads Campaign to give more value without asking for a direct action from the viewers. The point is to keep your brand top of mind and keep them engaged.

**Why is it important?**

To build the old “know, like and trust” with people who were just introduced to your brand with the Cold Direct Response Campaigns.

The nurturing campaign will put you top of mind with your audience, they understand how your business can help them, so they will be more receptive the next time they see your direct response ads.
Since we are not driving people out of the platform, Meta gives us an opportunity to reach these people .

**Steps to run a Cold direct response campaign**

1. Create 3 campaigns with the objective of “Awareness”: One for “30 days” audience, one for “60 days” and one for “90 days”.
2. Create 1 ad set for each ad. For the 30 days audience, select the following audiences (created on the section *Set up an Engagement audience*):
   * 1. Facebook engagement 30 days
     2. Instagram engagement 30 days
     3. Video viewers 30 days
     4. Website visitors 30 days.
3. There are 3 types of ad creatives. At minimum, you q should have one of each. Generally speaking, the more is better.
   1. Testimonials - This can be a video testimonial or image with a quote and photo of the person.
   2. Informational - Think of this as showing your prospects “How to” solve a problem or achieve a certain result. It doesn’t need to go too deep. But it needs to be something valuable they can’t get for free elsewhere. Video works best for informational creatives.
   3. Behind the scenes - These are video footage that you don’t normally share on social media. Examples:
      1. Clients asking you questions off stage during a live event
      2. Exclusive VIP lunch session with your clients
      3. Clips of how your team and how you run your business
4. Repeat steps 2 and 3 for “60 days nurturing”. For the audience, choose Facebook engagers, Instagram engagers and Video viewers with the Audience retention of 60 days and exclude audiences with retention of 30 days.Note: The creatives shown in this campaign should be different from the “30 days nurturing” campaign.
5. And And for the “90 days nurturing” campaign. For the audience, choose Facebook engagement 90 days, Instagram engagement 90 days, Video viewers 90 days and Website visitors 90 days and exclude audiences Facebook engagement 60 days, Instagram engagement 60 days, Video viewers 60 days and Website visitors 60 days.Note: The creatives shown in this campaign should be different from the “30 days nurturing” and “60 days nurturing” campaign.

**Examples of nurturing ads:**

1. [Nurture ads - Business Values](https://app.foreplay.co/share/boards/d110qayNfJbmAjlLLzPU?user=Orvelin%20Valle)
2. [Nurture ads - Personal Values](https://app.foreplay.co/share/boards/QWsHtNyRL8asRP9xn1BD?user=Orvelin%20Valle)
3. [Nurture ads - Testimonials](https://app.foreplay.co/share/boards/7Jac5aMzqDbrWEyVAN5I?user=Orvelin%20Valle)
4. [Nurture ads - Behind The Scenes](https://app.foreplay.co/share/boards/KvCe5FcjjH3ieDRSlyww?user=Orvelin%20Valle)
5. [Nurture ads - Highjacking Media + Value](https://app.foreplay.co/share/boards/5NFGn2PFUR0tgynNIAUK?user=Orvelin%20Valle)
6. [Nurture ads - Education](https://app.foreplay.co/share/boards/mnCESmFg24jJbmFuf6cB?user=Orvelin%20Valle)

### Step 2: Publish Web Content to complement traffic from paid ads

* Provide overwhelming value with long form content
* Distribute the content to your email list, messenger list, push notification list, outbound list
* Promote your offer using links, banners and pop-ups

### Step 3: Use Self-liquidating funnel to convert the traffic coming from Meta Ads and Web Content.

**What is a Self-liquidating funnel?**

It’s a series of steps in the form of pages that your visitors go through after they click on an ad or piece of web content. It aims to recover the cost of acquisition by solving a narrow problem for your audience.

Each step is meant to resolve a different aspect of a complete problem.

If your visitors are looking for a banana split, one step sells them the ice cream, the next one the banana and the last one the nuts and cherry. Each piece of the solution is part of solving a piece of a specific problem, like craving for a banana split. This is a fake example of course, but you get the idea.

The intent of these funnel (sequence of steps) is to collect information from your visitors (typically an email address) and make a first low-ticket sale.

**Why is it important?**

An effective self-liquidating funnel will collect the contact information and generate the initial revenue needed to keep fueling the ad spend and achieve the objective of ‘Growing the leads list’

**What are the main parts of an effective self-liquidating funnel?**

A good self-liquidating funnel has these main components: A lead magnet, a Landing Page, A One-time-Offer (OTO) page, a Confirmation Page and a Follow-up email sequence.

1. **The Lead magnet (product being offered on the Landing Page)**

The lead magnet is the product offered to visitors on the landing page in exchange for their contact details.

* + Ideally free of charge. If you want to charge for it, keep it super low cost (under $20)
  + Free vs paid lead magnets: both can help you grow your list, just using different approaches:
    - A free lead magnet is more likely to grow your list faster but you will have to grow harder in the funnel to recoup the Cost of Acquisition and warm up the relationship with those who get free lead magnet.
    - A paid lead magnet is more likely to get higher quality people into your leads list, but it will be more costly, making the lead list grow slower. Also, since this is the first purchase by a cold audience, it needs to provide overwhelming value vs. price
  + Solves a small, urgent problem entirely. By getting the lead magnet the client should feel like their problem has been solved.
  + Format is easy to consume: A Cheatsheet, a Blueprint, a Short book, an Audiobook, Report, a Swipe file/Template, a Calculator.

1. **The Landing Page (Offering the lead magnet)**

The purpose of the landing page in a self-liquidating funnel is to convince cold visitors that they should provide their contact information in exchange for the lead magnet.

Its main parts are: Headline, Banner, Offer benefits, Call-to-action and Social Proof.

**Headline**

The headline needs to be congruent with the previous step they took before landing on the page (ad or web content).

Here is a list of headline formula’s that have worked well for landing page headlines:

* + You are about to [benefit they want the most]
  + Secrets of [topic they have trouble with]
  + [Number] [quick wins] to achieve [big goal]
  + Copy and paste my [something that will be hard to do on their own] to get [some quick win they want].
  + The Ultimate/Definitive Guide to [some quick win they want]
  + The Black book of [topic of interest] secrets.
  + The [Year] [topic of interest] report.
  + Get your free [topic they have doubts about] evaluation.
  + [number] mysterious ways of getting [some quick win they want]
  + How to get [some quick win they want] without [something they hate]

**Offer: Benefits bullets.**

List 3-5 benefits in the form of bullets using as much depiction and detail as possible.

Here is a list of bullet formula’s that have worked well for landing pages:

* + How to eliminate [something they hate, ideally using their slang]
    - Example of golf promotion: How to eliminate “skulled” shots that roll too far! (This trick alone will shave a dozen strokes off your next round.)
  + Simple [part of the product] that deliver [final outcome they want]
    - Example of financial services: Simple investment tweak allows you to save the same amount of cash, earn the same return... yet receive 3 times the cash payout on retirement!
  + How to use [part of the product] from [unexpected source] that [works for even the most lower level user]
    - Example of self-defense course: How to use the devastating `pop up' push taken from the way tigers hunt in the wild... so effective, a 90 pound teenager can use it send a Sumo wrestler tumbling!
  + How to [create a situation that makes it impossible not to get results]
    - Example for workout program: How to give your most difficult body parts NO OTHER CHOICE but to grow... and grow fast! (Techniques that took me 21 years to perfect.)

**Banner Image.**

If using a free Lead Magnet:

* + 1 mock up image of the lead magnet above the fold.
  + Mock up image needs to be placed on a simple banner background
  + For a personality brand, you can include a picture of the person as part of the banner background, preferably in a position of authority.

Examples of a Banner Images:

![](data:image/png;base64...)![](data:image/png;base64...)

If using a paid Lead Magnet:

* + Test different visuals above the fold
  + Show mock up of the lead magnet
  + Short explainer video while holding the lead magnet
  + Add 5-6 more images in the page that helps to convey the benefits of your offer

Examples:

![](data:image/png;base64...)

**Call to action**

* + Make CTAs stand out with bold colors
  + Placement above the fold
  + Format of CTA
  + Option 1: Form: Having a form that collects contact information directly on the page
  + Option 2: Button: Button that opens a pop up containing the form to collect their contact information

**Social Proof**

There are 2 main ways to provide proof: Testimonials and Leveraged Credibility.

* + If using Leveraged Credibility: Use prominent sources you have been featured on, that your visitors might be familiar with.
  + If using Testimonials.
    - 1 to 5 Testimonials of people saying something about your products or services. Each testimonial needs to show: Name, Face, Company name (if you’re selling B2B), Quantifiable benefit.
    - Each testimonial talks about different benefits or handle different objections

**Examples of Landing Pages:**

* + Free lead magnet <https://highticketclientsbootcamp.com/free-cheatsheet>
  + Paid Lead magnet: <https://offersthatselllikecrazy.com/><https://highticketblueprints.com/>

1. **The One-time-Offer (OTO)**

**What product to offer**:

A One-time-Offer (OTO) is meant to tackle another aspect of the problem that attracted visitors to this funnel in the first place.

To make the right offer, choose one of these approaches:

* The 'next step' approach: if your lead magnet gives them the ability to solve the first step on the complete solution to the problem they have, then this OTO gives them the next piece of the solution (which tends to be more complex).

Example: For realtors: If the Lead magnet was ‘How to get your first listing’, the OTO could be: ‘How to promote your listing with a tiny budget so you sell the property in no time’.

* The 'greater' approach: the lead magnet gives them a complete solution to the problem and the OTO gives them something that makes that solution faster or more efficient or easier.

Examples:

For sales professionals: If the Lead Magnet was: A script to get pass gatekeepers in B2B sales, the OTO would be: An audio version of the script which denotes the tonality that needs to be used. Or a recording of sales person using the script on actual calls.

For marketers: if the Lead Magnet is a breakdown of a perfect ad, the OTO would be: A swipe file with 100 examples of successful ads.

1. **OTO page (offering the One-time-Offer)**

The purpose of this step is to sell the One-time-Offer to recoup part if not all the cost of acquisition (ads, commissions, publishing costs) by offering an irresistible, low-ticket offer.

**‘Above the fold’ banner**

* Show a Progress bar that indicates an incomplete process
* Use a headline that keeps the ‘buying loop’ open:
  + For example: “Congratulations on getting \_\_\_\_. It’s on the way to your inbox. In the mean time, watch this video…”
* Video Sales Letter (VSL): Follow this script:
  + Confirm the free lead magnet is on the way
  + Reaffirm the decision of getting the lead magnet.
  + Transition into the OTO: Offer them a way to get even better results, faster.
  + Introduce the ‘One Thing’: Highlight one essential element that will make the biggest impact.
  + Future Pacing: Help them visualize how this OTO will transform their results.
  + Tell them to take Action
  + Guarantee & Value Stack: Offer security and reinforce the benefits.
  + Scarcity/Urgency: Emphasize limited availability.
  + Tell them to take Action (2nd time)
  + Testimonials (if available): Show social proof.

**Call to Action (CTA) buttons:**

Buttons should send visitors to a checkout form where they can insert they payment details.

For the text in the Call-to-action button follow these formulas:

* Yes, I want [main value they will get]
* Get [main benefit they will get from the product]
* Access [your product name]

**Offer refusal:**

It’s a ‘No thanks’ option with psychological triggers below each CTA button. Send people to the confirmation page.

* Example: “No Thanks. I don’t want a proven system to bring a flood of premium clients to my business. I’ll pass on this one”
* When clicked, trigger a pop up with a downsell.

**Scarcity & Urgency.**

Scarcity and Urgency methods are meant to ethically reduce procrastination and hesitation:

Effective elements include:

\* A 10-minute timer to encourage quick decisions.

\* You can use statements like “This page will only be shown ONCE. If you leave, this deal is gone.” or "This one-time-offer cannot be found elsewhere."

Make sure this is not a trick and your urgency and scarcity is genuine.

**Testimonials**:

* 5-10 Testimonials of people recommending your products or services. Each testimonial needs to show: Name, Face, Company name (if you’re selling B2B), Quantifiable benefit.
* Each testimonial talks about different benefits or handle different objections

**Examples of OTO pages:**

* + <https://highticketclientsbootcamp.com/htclients-marketing-upgrade-now>
  + <https://highticketclientsbootcamp.com/htclients-smart-upgrade-now>
  + <https://www.highticketblueprints.com/bp-fis-upgrade-now>
  + <https://offersthatselllikecrazy.com/offers-hto-live-now>

1. **Note: 2nd OTO Page (after the first OTO page)**

In some cases the cost of acquisition is too high for a single OTO to recoup it. So many companies go for a 2nd OTO after the first one. The benefit of it is that since the payment information has already been collected, it can be one-click-purchase. Clients don’t need to enter their payment information again.

**What product to offer:** The offer principle is the same, it should aim to make the solution to the main problem more complete.

**OTO 2 page structure:**

* + Except for the Call-to-action buttons, follow the same structure as OTO 1 pages: The progress bar, Headline, VSL, Scarcity, Urgency and Testimonials.
  + Call-to-action buttons: Since Button is 1-click upsell type, it means the order will be automatically processed without the user keying in their payment details again. The text on the button needs to be simple and encouraging like “Yes! Add [Product name] to My Order” or “Yes! Upgrade My Order Now”. For compliance, include a disclaimer that they will be charged when they click the button. This helps to prevent customers asking for refunds due to a misclick. For example: “When You Click On This Button, You Will Be Charged $97 And Get Instant Access”.

1. **Confirmation Page**

The purpose of the Confirmation Page is letting the buyer know their payment has been received and their product is on the way to be fulfilled.

**What should the Confirmation Page say**

* Congratulate them on their decision
* Tell them what happens now: how will they get what they opted in for or paid for.
* Transition to something value for your company if they want to stay.

**Examples of a Confirmation Page:**

Example 1: Transition to another upsell

![](data:image/png;base64...)

Example 2: Transition to creating an account

![](data:image/png;base64...)

Example 3: Transition to building authority

![](data:image/png;base64...)

Example 4: Transition to consumption

![](data:image/png;base64...)

1. **Follow Up Email Sequence**

Also known as Abandoned Cart Sequence, it aims to maximize the revenue generated from all leads collected in this funnel.

**Sequence Structure:**

- 3-5 emails targeting all leads who did not complete an OTO purchase.

- First email should be sent immediately after the lead opted in.

- Email content should reassure the reader about getting the Lead Magnet.

- If you have a sales team who can follow up on new buyers, consider sending a 2nd email 15 minutes later from a rep, saying ‘hi’ and looking for engagement

- Subsequent emails should be sent 1 day apart.

- The purpose of these emails is to providing more value that complements the Lead Magnet and only pitch the OTO in the P.S. section.

**Examples of subject lines for a follow up email sequence:**

1st email Subject Line formula:

* Your [lead magnet name] inside.
* Download your [lead magnet name]

2nd to last email Subject Line formulas: Keep words count to under 9 words and follow any of these formulas:

* Reminder/Urgency subject lines:
  + forgot something?
  + Seems you left something behind..
  + last chance to access [short OTO name]
  + We saved a [short OTO name] for you
* Value subject lines:
  + keys to [lead magnet topic]
  + How to make the best of [lead magnet name]
  + Say good bye to [problem the lead magnet solves]
  + [customer profile] are making the most of [lead magnet]
* Patter interrupt:
  + Great, another email!
  + Ok, now what?
  + For your eyes only
  + Shhh... Don’t tell anyone but...
  + Hang on
  + yay or nay?

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Objective: Increase new sign ups to your core offer.

### Important concepts:

* A ‘core offer’ in any knowledge-based product line is the product that generates the most revenue for your company and turns people who are merely in your list and barely know your name into long term relationships. Core offers usually come in the form of longer term programs, events or memberships.
* Increasing sign ups to your core offer requires that you are actively building a list of leads that are being introduced to your business for the first time. This is covered under objective: **Grow your Leads List.**
* Once you’ve started getting some results on ‘Growing your List’ objective you can implement this objective to increase sign ups to your core offer by following these steps:

### Step 1: Warm your leads list with an interesting newsletter.

**Purpose**

It’s important what people did before they ended up on your list: they saw an ad, read an article about what you do and perhaps bought a low-ticket product from you. We cannot and should assume they like, trust or perhaps even remember your company. We should assume they are just as cold as the first time they came in touch with your company.

So how do we warm up the relationship? Become someone they actually want to hear from.

But this is often a delicate balance, you could become annoying very fast, so it’s important to keep an eye on your metrics and use it to improve the quality of your content. Don’t worry I’ll help you with that.

**Frequency**

It depends on how good are you at ‘becoming someone they want to hear from’. The better your content is, the more frequently they’ll want to hear from you. You can start weekly and move your way up from there.

Think of your favorite sitcom, when once the last time you found a new episode annoying or too much for you?

It also depends a bit on your niche. A Day Trading Coaching company will likely have higher frequency of communications than a Real Estate Consulting Firm.

Whichever frequency you choose, follow regular cadence and timing to increase your credibility in the eyes of readers as well as the Email service providers and ISPs. Modern ISPs (and spam filters) catch emails by the cadence. If you send emails to thousands of subscribers in a week, then go silent for months, you’d probably be flagged as spammy.

If you send weekly letters**, Tuesdays** are showing slightly higher open rates. Time wise, mails sent at 11:00 am report a higher open rate

**Main Parts of a newsletter**

1. **The name**

The purpose of the name is to brand your newsletter. So the newsletter brand stand on its own, readers talk about it and share it with others.

Key thing about the name is that it needs to mean something to the audience you are targeting. The closer you are to their lingo, the easier you’ll win their hearts

Here are a few examples:

* Milk Road: About Web 3
* Morning Brew: About business news
* Full-stack creators: for ghostwriters
* Trends VC: About business and investments trends
* The hustle: About business and tech
* Refactoring: for coders
* Letters from an American: About U.S.politics
* Maker mind: About productivity

1. **The Content**

For newsletter content, remember the cardinal rule of any marketing message: don’t be boring.

The safest way to not be boring is to aim to hits these 3 objectives: entertain, engage and provide value.

All 3 of them at the same time, because if one fails, the newsletter fails.

**Entertain**:This is about getting the ‘voice’ right. That means the tone and personality of the text and images in the newsletter.

Being entertaining is an art, the right type of humor will make your audience addicted to your messages while the wrong type will be a massive turn off. Every audience is different, but the clever-funny type seems to be a proven way of growing for knowledge-based companies.

Example:

![](data:image/png;base64...)

**Engage**: Keeping newsletter readers on a phone or desktop means keeping them scrolling and clicking, without overwhelming them.

To achieve this, aim to break down the content into distinct content sections. Each one with its own point to make and links that open on a new tab, so users click on them if they want further info. Another successful tactic is to add a set of action items readers can take at the end of the newsletter. That way they can take full advantage of what you’ve share with them

Example.

![](data:image/png;base64...)

**Provide value**: how much value can you provide in the newsletter will be the main factor for the newsletter’s organic growth. How likely are readers to have a ‘wow’ moment that makes them want to share your newsletter to a friend or colleague. Since the purpose of the newsletter is to warm up new leads, your content needs to expand on the topics that drew them in in the first place. What got their attention to begin with, how can you provide a quick win aligned to those topics.

Example:

![](data:image/png;base64...)

1. **The links**

When it comes to links in a newsletter you are likely to use content links, promotional links and branding links.

Follow this link guidelines:

* Content links: These are the links that will take the reader to a page with additional information to consume. That page can be hosted by you or some other authoritative source of information (trustworthy source). Limit the number of Content links to 3 per content section. For example if your newsletter has 5 content sections you will be your content links to under 15. The format to use is a hyperlinked text.
* Promotional links: These are call-to-action links. Once you’ve earned the right to promote your products/services or someone else’s affiliate links, you can add a promotion with a link. Limit the number of promotional links to 1 per newsletter. The format to use is a button since they stand out more than a hyperlinked text.
* Branding links: These are your social and web links, your unsubscribe link, your poll link. Place this in the newsletter footer.

1. **The Subject Line**

* Once you’ve laid out your newsletter content, go through it a capture a couple of phrases that instantly capture your attention. Those are your subject line options/variations that will be edited following this framework:
* Framework for newsletter subject lines:
  + Length: make them as short and intriguing as possible (less than 5 words) so they can read it in every device.
  + Talk about something that hit as many as you can of these 3 points: newsworthy, problem or promise, makes them curious.
  + Don’t overdo emotion by using all caps, several emojis, exclamation marks, spammy words (like free, guaranteed, win). 1 emoji is acceptable.
  + Use personalization from time to time, but not too often.
* Then run the edited versions as part of a Split test in your email marketing tool. Most email marketing tools have an A/B test feature these days. Add your subject line candidates as variations on your email marketing tool. What will happen is that the tool will determine (or will ask you to determine) a percentage of your leads list to make part of the test. This smaller group will receive both subject line options and once the tool finds the winner it will use that subject line for the rest of your leads list.

### Step 2: Promote an event that sells your core offer

**Purpose**

Onceyour leads list is regularly opening your newsletter, then you have earned the right to pitch your core offer.

The way the core offer pitch is deliver is known as the ‘main conversion mechanism’:

Some of the most effective conversion mechanism for core offers in knowledge-based industries are **events**. Whether they are in person or virtual (webinars), they present a unique opportunity to showcase your expertise to potential buyers of core offer.

This event can be promote through ads/social media but also directly to your newsletter readers on the newsletter.

**Promoting the event**

* To newsletter readers

If you have been following the recommendations from Step 1: Warm your leads list with an interesting newsletter you should have a list of leads eager to hear from you. After sending some great newsletters you have earned the right to pitch your products.

To promote your event to newsletter readers add a promotional banner that blends well with your content. Every newsletter reader who clicks on the promotional banner needs to be added to a segment on your email marketing tool. Segmenting your audience means putting people in different groups with the aim of providing a different selling proposition to each one.

The selling proposition in the emails is about going deeper in the topics that tend to be popular among newsletter readers.

Example of even promotions on newsletters:

![](data:image/png;base64...)

Example 2 of event promotion on newsletter:

![](data:image/png;base64...)

* To leads can came from social mendia/ads promotions for the event

If you are running an event (in person or webinar) to get more sign ups to your core offer, you are expected to have an event page and promote that event on social media, paid ads and/or your website. As a result, you will be getting traffic to that event page and you can capture email addresses of people who visit the event page but are not ready to buy.

Add the to a segment in your email marketing tool.

The selling proposition is previewing the value of the event. You can do that with value tips coming from the event, social proof from past event participants, teasers on the event agenda, speakers and expected outcome.

* To Past attendees (for events only)

If your event can benefit of having attendees coming over more than once, then consider adding all those past attendees to a segment in your email marketing tool.

The selling proposition is to evoke nostalgia (using images from past events takeaways) and show them what’s different about the upcoming event.

**Event Sales tactics**

Depending on how far apart you run your events, you might need all or part of these tactics.

The longer the time in between events (campaign duration), the more tactics are needed.

* Early bird tactic

This classic technique has proven to work when campaigns are long and there is no natural urgency to compel people to buy. To solve this, offer a better deal during the first part of the campaign and stop it once you are close enough to the deadline that natural urgency kicks in.

* Bonus special tactic

This tactic dictates that for a special bonus is offered for a limited period of time for everyone who buys an event ticket at the original price.

* Last Push tactic

This tactic aims to play the natural urgency your audience feels as you get closer to the event.

This works well during the last 10-20% of the campaign duration. So a Last push email sequence is formed by series of emails that get more frequent as the time for the event approaches.

**Note: if your main conversion mechanism is 1:1 consultations**

If your main conversion mechanism is a 1:1 consultation and skipping any kind of event live or pre-recorded.You need a booking page and promote the consultation on social media, paid ads or your website. As a result, you will be getting traffic to that event page and you can capture email addresses of people who visit the event page but are not ready to buy.

Add the to a segment in your email marketing tool.

The selling proposition is previewing the value of the consultations. Best way to do that is showing massive amounts of social proof from past attendees (testimonials, takeaways, results).

Warning, skipping an event and going straight to a phone call requires a highly popular core offer to be successful.

**Example of a plan for Promotional email sequence promoting a virtual event (main conversion mechanism) that takes place every 90 days.**

| Sales Tactic | Duration | Segment | Email cadence | Content points |
| --- | --- | --- | --- | --- |
| Early bird | 45 days (From Day 90 to Day 45 before the event) | Newsletter clickers | * 1 email per week until 48hrs before ending Early bird campaign. * 1 email 24hrs before closing early bird. | * Early bird is open. Ticket is 50% off from the original price * How event expands on newsletter topics * Closing Early bird (urgency) |
| Opt-ins from promotions | * 1 email per week until 48hrs before ending Early bird campaign. * 1 email 24hrs before closing early bird. | * Ticket is 50% off from the original price. * Value tips. * Social proof * Closing Early bird (urgency) |
| Bonus special | 30 days (From day 45 to day 15 before the event) | Newsletter clickers | * 1 email per week until 49hrs before ending Bonus special. * 1 email 24hrs before closing early bird. | * Bonus special is open. Showcase bonuses. * Value: a useful preview from bonuses. * Last chance to get the bonuses (urgency) |
| Opt-ins from promotions | * 1 email per week until 48hrs before ending Bonus special. * 1 email 24hrs before closing early bird. | * Bonus special is open. Showcase bonuses. * Value: a useful preview from bonuses. * Last chance to get the bonuses (urgency) |
| Last Push | 15 days (From day 15 until the date event) | Newsletter clickers | * 1 email every 3 days until 48 hrs before the event. * Then 1 email 24hrs before. * And finally a ‘last-call’ email 3 hrs before the event | * Deep dive on the event agenda. * Preview of speakers or topics to cover. * Social proof with results driven testimonials. * # of tickets left * Last chance to get a ticket. |
| Opt-ins from promotions | * 1 email every 3 days until 48 hrs before the event. * Then 1 email 24hrs before. * And finally a ‘last-call’ email 3 hrs before the event | * Deep dive on the event agenda. * Preview of speakers or topics to cover. * Social proof with results driven testimonials. * Objection handlers * # of tickets left * Last chance to get a ticket. |


