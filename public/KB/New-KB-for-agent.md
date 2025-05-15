

Industry: Expertise/knowledge

Table of content:

1. Preparation before running Ad campaigns
2. How to come up with effective Ad Creatives (Videos and Images)
3. Objective: Getting new clients

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Based Doc 1: Preparation before running Ad campaigns

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

## Base Doc: How to come up with effective Ad Creatives (Videos and Images)

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

Visual examples:

Example 1:

![](data:image/png;base64...)

Example 2:

![](data:image/png;base64...)

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

## Objective: Grow your leads list

### Context:

* There are different ways of getting new clients. Some are more aggressive, while others are more conservative.
* Budget is very important to define which way to go. For small and medium businesses without big funding, the recommended growth strategy is ‘bootstrapping with paid ads’. Which means growing your leads list with paid ads and attempt to liquidate the cost of ads by selling a low ticket product as soon as they come in. The low ticket product we’re discussing here is not your core offer.
* Bootstrapping with paid ads works best when you already have a core offer that has been selling in the market with relative success and you need to scale it.
* Since most of the initial traffic will come from ads, it’s fundamental to the success of this strategy to prepare your ad account to succeed. The section Preparation before running Ad campaigns needs to be done first. Once that has been done, follow the steps below:

### Step 1: Get traffic from ads.

* The chosen ads platform is Meta, which are good for getting your business in front of new people, who have never heard of you.
* The goal here is to get the meta audience to engage with your ads, click-through to your landing page and make a first purchase that covers the cost of ads.
* These are the most basic campaigns you need to set up in Meta:

1. **Cold direct response campaign**

**What is it?**

Meta Ads Campaign to reach people who have never heard of you with interesting content that gets them to click on your ads.

**Why is it important?**

To grow your business with ‘bootstrapping with paid ads strategy’ you need to engage and convert people who have never heard of you.

**How do you run it?**

1. Create a campaign with “Sales” campaign objective
2. Create 2 ad sets - one with a “Broad” audience. And the other with a “Lookalike” audience. Exclude from the audience all leads, all buyers and website visitors older than 180 days.
3. For each ad set, add at least 5 ads with different creatives (test different hooks and angles). What’s an angle and hook? Each ad should have at least 3 different headlines and 3 different primary text. These ads are direct response and should have a call to action.
4. The types of creatives that work best are videos. The hook should contain props that are weird or interesting that pique the user’s curiosity. Because audiences are cold, hooks should not be just you or your brand. Several variations will be needed. If you are not sure you will have time to get this videos done, make sure to cover the section [How to create many ad video variations fast]
5. Recommended budget to start is $50/day and increase the budget as recommended depending on results. Among the ad campaigns to get new clients, this should have the biggest share of the budget because the audience pool is bigger.

Cold direct response ads examples:

* + - <https://www.facebook.com/100044290666193/posts/1144190943733917>
    - <https://www.facebook.com/100044290666193/posts/1144192420400436>
    - <https://www.facebook.com/100044290666193/posts/1144190930400585>
    - <https://www.facebook.com/100044290666193/posts/1144188337067511>

1. **Nurturing campaigns**

**What is it?**

Meta Ads Campaign to give more value without asking for a direct action from the viewers. It’s meant to get them to remember your business and engage with the content in the ad.

**Why is it important?**

To build “know, like and trust” with people on the Meta platform who have heard about your for the first time from the Cold Direct Response Campaigns. The nurturing campaign will put you top of mind with your audience, they understand how your business can help them, so they will be more receptive the next time they see your direct response ads.
Since we are not driving people out of the platform, Meta gives us an opportunity to reach these people cheaply.

**How do you run it?**

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

Nurturing ad Examples:

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

It’s a series of steps in the form of pages that your visitors go through after they click on an ad or piece of web content.

Each step is meant to resolve a different aspect of a complete problem.

If your visitors are looking for a banana split, one step sells them the ice cream, the next one the banana and the last one the nuts and cherry. This is a fake example of course, but you get the idea.

The intent of these funnel (sequence of steps) is to collect information from your visitors (typically an email address) and make a first low-ticket sale.

**Why is it important?**

An effective self-liquidating funnel will collect the contact information and generate the initial revenue needed to keep fueling the ad spend and achieve the objective of ‘Growing the leads list’

**How to build an effective self-liquidating funnel?**

A good self-liquidating funnel has these main components: A lead magnet, a Landing Page, A One-time-Offer (OTO) page, a Confirmation Page and a Follow-up email sequence. Let’s look at them one by one:

1. **The Lead magnet (product being offered on the Landing Page)**

About the lead magnet (what you are offering visitors on the landing page in exchange for their contact details)

* + It should be free or under $20
  + Solves a small, urgent problem entirely. By getting the lead magnet the client should feel like their problem has been solved.
  + Overwhelming value vs. price (specially if paid)
  + Format is easy to consume: Cheatsheet, Blueprint, Short book, Audiobook, Report, Swipe file/Template, Calculator
  + Example of a Free lead magnets:
    - <https://highticketclientsbootcamp.com/free-cheatsheet>
    - <https://highticketofferformula.com/>
  + Examples of Paid lead magnets:
    - <https://www.highticketleadfunnels.com/>
    - <https://offersthatselllikecrazy.com/>
    - <https://highticketblueprints.com/>

1. **The Landing Page**

**Purpose:** convince those cold visitors that they should provide you their contact information in exchange for the lead magnet.

**Parts of Landing Page:**

* 1. Headline or Selling Proposition.

The headline needs to be congruent with the previous step they took before landing on the page (ad or web content).

Here is a list of headline formula’s that have worked well for landing page headlines:

* + - You are about to [benefit they want the most]
    - Secrets of [topic they have trouble with]
    - [Number] [quick wins] to achieve [big goal]
    - Copy and paste my [something that will be hard to do on their own] to get [some quick win they want].
    - The Ultimate/Definitive Guide to [some quick win they want]
    - The Black book of [topic of interest] secrets.
    - The [Year] [topic of interest] report.
    - Get your free [topic they have doubts about] evaluation.
    - [number] mysterious ways of getting [some quick win they want]
    - How to get [some quick win they want] without [something they hate]
  1. Offer: Benefits bullets.

List 1 to 3 benefits in the form of bullets. Here are a few examples:

Example of golf promotions:

* + - How to control the RPMs of your ball's spin with pinpoint accuracy! (So instantly accurate, you'll be able to practice with your 8-iron in your living room... and never hit a lamp or knock a picture off the wall!)
    - How to eliminate “skulled” shots that roll too far! (This trick alone will shave a dozen strokes off your next round.)
    - The simple little tip that automatically insures your clubhead is ALWAYS in the perfect position upon impact with the ball. (Ernie Els has this down - it's the reason he's known as probably the most accurate golfer in the pro game!)

Example for financial mailing:

* + - 56 juicy tax deductions most people never use... that the wealthy feast on to legally keep staggering amounts of money from the IRS!
    - Simple investment tweak allows you to save the same amount of cash, earn the same return... yet receive 3 times the cash payout on retirement!
    - Eye-opening advice from professional burglars on making your home theft-proof. Every one of your neighbors may get hit, but the crooks will pass you by.
    - Earn $1,500 a day in your pajamas working from home! Little-known valuable service means big bucks. Your own hours. No boss. Businesses are desperate for people to do this.
    - Huge blunder parents make with their kids' college financing! Your good intentions can get students bumped from school!

Example of self-defense programs:

* + - New (and simple) exercises that actually install animal quickness and viciousness directly into your muscles and nerves... leaving it locked there until you need to spring it loose! (Go from calm to frightening in a split second, whenever you choose... or whenever you're threatened!)
    - How to use the devastating `pop up' push taken from the way tigers hunt in the wild... so effective, a 90 pound teenager can use it send a Sumo wrestler tumbling!
    - Leverage secrets that multiply every pound of your weight ten times, giving you “Godzilla” advantages against even a much-heavier opponent!
    - How to immediately pump 40% more raw power into every blow you deliver!
    - How to quickly make a strong opponent weak! (You'll see his “will to fight” rush out of him like a punctured balloon, while he exhausts himself with frustration and rage... turning him into a nice soft punching bag for you, no matter how big and pissed-off he was to start.)

Example from a “better sex” book:

* + - How to guarantee your partner an “over-the-top” orgasm... every time you make love!
    - Amazing trick that instantly eliminates “performance anxiety” in men! (Used for centuries by the most daring and successful lovers in the world.)
    - What women desperately want from men (but will never come out and tell you)! Explains what she craves from you (and probably isn't getting)... and why the erotic rewards of correcting this “sexual standoff' will take your breath away!

Example from a bodybuilding promotion:

* + - How to shock your muscles into growing faster than they “intuitively” want to! (So you'll blast right through plateaus like they were paper walls!)
    - How to give your most difficult body parts NO OTHER CHOICE but to grow... and grow fast! (Techniques that took me 21 years to perfect.)

Example from a health book:

* + - Little-known herbal supplement has “100% success rate” for clearing up bladder infections! (And, nope, it's NOT cranberry juice.)
    - New all-natural way to increase serotonin (the brain chemical that fights depression) works just like Prozac... minus the drowsiness and brain-fog!
    - Doctors are now using this hot new herbal compound to slow the memory loss of Alzheimer's more effectively than expensive, dangerous prescription drugs!
  1. Visuals: Banner Image.

If using a free Lead Magnet:

* + - 1 mock up image of the lead magnet above the fold.
    - Mock up image needs to be placed on a simple banner background
    - For a personality brand, you can include a picture of the person as part of the banner background, preferably in a position of authority.

Examples of a Banner Image:

* Example 1:

![](data:image/png;base64...)

* Example 2:

![](data:image/png;base64...)

If using a paid Lead Magnet:

* + - Test different visuals above the fold
    - Show mock up of the lead magnet
    - Short explainer video while holding the lead magnet

Add 5-6 more images in the page that helps to convey the benefits of your offer

Example:

![](data:image/png;base64...)

* 1. Call to action
     + Make CTAs stand out with bold colors
     + Placement above the fold
     + Format of CTA
     + Option 1: Form: Having a form that collects contact information directly on the page
     + Option 2: Button: Button that opens a pop up containing the form to collect their contact information
  2. Proof

There are 2 main ways to provide proof: Testimonials and Leveraged Credibility.

* + If using Leveraged Credibility: Use prominent sources you have been featured on, that your visitors might be familiar with.
  + If using Testimonials.
    - * 1 to 5 Testimonials of people saying something about your products or services. Each testimonial needs to show: Name, Face, Company name (if you’re selling B2B), Quantifiable benefit.
      * Each testimonial talks about different benefits or handle different objections

Examples of Landing Pages:

* + - <https://highticketclientsbootcamp.com/free-cheatsheet>
    - <https://www.highticketleadfunnels.com/>
    - <https://offersthatselllikecrazy.com/>
    - <https://highticketblueprints.com/>
    - <https://highticketofferformula.com/>

1. **The One-time-Offer (OTO) Page**

**Purpose**

Recoup part if not all the cost of acquisition (ads, commissions, publishing costs) by offering an irresistible, low-ticket offer.

**What product to offer**:

One-time-Offer (OTO) is meant to tackle another key aspect of the problem the lead magnet aims to solve. There are few ways to go about this:

* + The next step approach: your lead magnet gives them the ability to solve the first step on the complete solution to the problem they have, then this OTO gives them the next step on the solution (which tends to be more complex).
    - Example: For realtors: If the Lead magnet was ‘How to get your first listing’, the OTO could be: ‘How to promote your listing so you sell the property in no time’.
  + The complement approach: your lead magnet gives them a complete solution to the problem and the OTO gives them something that makes that solution faster or more efficient or easier.
    - Examples:
      * For sales professionals: If the Lead Magnet was: A script to get pass gatekeepers in B2B sales, the OTO could be: An audio version of the script which denotes the tonality that needs to be used. Or a recording of sales person using the script on actual calls
      * For marketers: if the Lead Magnet was: A breakdown of a perfect ad, the OTO could be: A swipe file with 100 examples of successful ads.

**OTO Page structure:**

* Length of page is 5 full screen scrolls max.
* Show a Progress bar that indicates an incomplete process
* Headline: Keep the Buying Loop Open
  + For example: “Congratulations on getting \_\_\_\_. It’s on the way to your inbox. In the mean time, watch this video…”
* Video Sales Letter (VSL)
  + Confirm the free lead magnet is on the way
  + This is the results you can get by implementing the free lead magnet
  + Transition into the OTO: Offer them a way to get even better results, faster.
  + Introduce the ‘One Thing’: Highlight one essential element that will make the biggest impact.
  + Future Pacing: Help them visualize how this OTO will transform their results.
  + Call to Action #1
  + Guarantee & Value Stack: Offer security and reinforce the benefits.
  + Scarcity/Urgency: Emphasize limited availability.
  + Call to Action #2
  + Testimonials (if available): Show social proof.
* Call to Action (CTA) button: it should sending people to the checkout form. And the button should contain the message positive.
  + Formulas for text on Call to action buttons (CTA):
    - Yes, I want [main value they will get]
    - Get [main benefit they will get from the product]
    - Access [your product name]
* Offer refusal: ‘No thanks’ option with psychological triggers below each CTA button. Send people to the confirmation page.
  + Example: “No Thanks. I don’t want a proven system to bring a flood of premium clients to my business. I’ll pass on this one”
  + When clicked, trigger a pop up with a downsell.
* Scarcity & Urgency elements to reduce procrastination and hesitation:
  + A 10-minute timer to encourage quick decisions.
  + You can use statements like “This page will only be shown ONCE. If you leave, this deal is gone.” Make sure this is not a trick and your urgency and scarcity is genuine.
* Testimonials:
  + 5-10 Testimonials of people recommending your products or services. Each testimonial needs to show: Name, Face, Company name (if you’re selling B2B), Quantifiable benefit.
  + Each testimonial talks about different benefits or handle different objections

**Note: About adding a 2nd OTO:**

In some cases the cost of acquisition is too high for a single OTO to recoup it. So many companies go for a 2nd OTO after the first one. The benefit of it is that since the payment information has already been collected, it can be one-click-purchase. Clients don’t need to enter their payment information again.

* **What product to offer:** The offer principle is the same, it should aim to make the solution to the main problem more complete.
* **OTO 2 page structure:**
  + Except for the Call-to-action buttons, follow the same structure as OTO 1 pages: The progress bar, Headline, VSL, Scarcity, Urgency and Testimonials.
  + Call-to-action buttons: Since Button is 1-click upsell type, it means the order will be automatically processed without the user keying in their payment details again. The text on the button needs to be simple and encouraging like “Yes! Add [Product name] to My Order” or “Yes! Upgrade My Order Now”. For compliance, include a disclaimer that they will be charged when they click the button. This helps to prevent customers asking for refunds due to a misclick. For example: “When You Click On This Button, You Will Be Charged $97 And Get Instant Access”.

Examples of OTO pages:

* + <https://highticketclientsbootcamp.com/htclients-marketing-upgrade-now>
  + <https://highticketclientsbootcamp.com/htclients-smart-upgrade-now>
  + <https://www.highticketblueprints.com/bp-fis-upgrade-now>
  + <https://offersthatselllikecrazy.com/offers-hto-live-now>

1. Confirmation Page

**Purpose:**

Letting the buyer know their payment has been received and their product is on the way to be fulfilled.

**Page structure:**

Keep it short and simple, if the buyer needs to take action on something post-purchase this is the time to let them know.

**Example of a Confirmation Page:**

1. Follow Up Email Sequence

**Purpose:**

Also known as Abandoned Cart Sequence, it aims to maximize the revenue generated from all leads collected in this funnel.

**Sequence Structure:**

* + 3-5 emails targeting all leads who did not complete an OTO purchase.
  + First email needs to be sent immediately after the lead opted in.
  + Email content should reassure the reader about getting the Lead Magnet.
  + If you have a sales team who can follow up on leads, consider sending a 2nd email 15 minutes later from a rep, saying ‘hi’ and looking for engagement
  + Subsequent emails 1 day apart.
  + The purpose of these emails is to providing more value that complements the Lead Magnet and only pitch the OTO in the P.S. section.

**Example of follow up email sequence:**


