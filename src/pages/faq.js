import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const faq = () => (
  <Layout>
    <Seo title="Polling FAQs" description="Frequently asked questions" />
    <h1>Frequently Asked Questions</h1>
    <h2>Does Polling Canada conduct polls?</h2>
    <p>No. Polling Canada aggregates publicly available content.</p>
    <h2>Is Polling Canada biased?</h2>
    <p>Polling Canada aggregates publicly available content.</p>
    <h2>I have some insider information that proves your polls wrong!</h2>
    <p style={{color: "red"}}><strong>Polling Canada aggregates publicly available content.</strong></p>
    <h2>Can I use your graphics?</h2>
    <p>Yes! All Polling Canada graphics are released under a <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">Creative Commons license</a> - specifically, Attribution-ShareAlike 4.0. That means you can legally do anything you like with them, as long as Polling Canada gets credited and you don't attempt to impose copyright on the result.</p>
    <h2>How can a sample size of 1,000 represent millions?</h2>
    <p>Statistics! Nothing can exactly replace the precision of surveying everyone in the country (hence why we still hold elections). But a few hundred respondents is mathematically good enough 19 times out of 20.</p>
    <h2>What about this Twitter poll with 50,000 responses?</h2>
    <p>In a scientific poll, every demographic is specially weighted relative to its share of the population. Social media polls are unscientific (and dominated by people who spend all day on social media), making them useless for understanding the general public.</p>
    <h2>Who decides if a company is "reputable"? Is it you?</h2>
    <p>Nope. It's a professional body, the <a href="https://www.canadianresearchinsightscouncil.ca" target="_blank" rel="noreferrer">Canadian Research Insights Council</a>. In particular, a reputable firm needs to adhere to the <a href="https://www.canadianresearchinsightscouncil.ca/standards/por/" target="_blank" rel="noreferrer">Standards and Disclosure Requirements</a>.</p>
    <h2>Aren't polls always wrong?</h2>
    <p>Some pollsters certainly suck, but the majority who remain in business are actually quite good at predicting Canadian elections. Most races in the last 10 years have been called correctly.</p>
    <h2>Aren't polls sometimes wrong?</h2>
    <p>This is undeniably true.</p>
    <h2>Don't you think this poll is an outlier?</h2>
    <p>Statistics! If polling companies weren't free to publish weird results, they would often miss very real shifts in public opinion. A few polls being out to lunch is actually a sign that the system is working. To tell a trend from an outlier, just wait and see if other companies detect the same thing or not.</p>
    <h2>Why don't national polls include Newfoundland and Labrador, Nova Scotia, Prince Edward Island, New Brunswick, Manitoba, Saskatchewan, or the North?</h2>
    <p>Sadly, a national poll isn't guaranteed to contact enough people in any of these areas, so they get rolled together (or, in the case of the North, ignored by all parties). To illustrate the problem: if you contact 1,000 random Canadians, the average number of responses you'll get from P.E.I. is 4.</p>
    <h2>Do campaigns use polls to lie?</h2>
    <p>Hiring reputable market research firms is quite expensive. When political campaigns want to lie about how much support they have, they usually just tell those lies directly.</p>
    <p>Much more common is <em>misrepresentation</em> of legitimate data, either by intentionally being clumsy with what questions were really asked, or using misleading chart designs meant to play on the public's emotions. Hence, Polling Canada's mandate to present all data neutrally.</p>
    <h2>Do polling companies use polls to lie?</h2>
    <p>In Canada, polling companies actually do most of their business <em>outside</em> election season. Elections are like a marquee event where pollsters compete to show non-political clients how accurate their data is. If one pollster were massaging the numbers for the benefit of their favourite party, other pollsters would have a huge incentive to contradict them.</p>
    <h2>Do individual polls affect the outcome of an election?</h2>
    <p>This is a great question that hasn't been conclusively answered! Academics think they're similar to lawn signs - they don't do much to boost specific candidates, but they can raise turnout by increasing the political awareness of the public.</p>
    <h2>Where's Yukon?</h2>
    <p>Yukon gets polled approximately once every two years. <Link to="/YT">But since you asked...</Link></p>
    <h2>Where are the Northwest Territories and Nunavut?</h2>
    <p>Both territories practice non-partisan "consensus government". The Premier and Cabinet are elected by independent legislators. To find out who might be Premier next, we recommend personally asking an MLA about it.</p>
    <h2>Can you explain margin of error in 10 easy words?</h2>
    <p>Numbers Usually About This Wrong, Compared To Entire Country's Opinion.</p>
  </Layout>
)

export default faq