---
description: A case study of the redesign process and UX improvements at Selectel
hide_table_of_contents: true
image: /img/story-redesign/storyRedesign-1.png
---

import '../css/project-page.css'
import { TopNavigation, ProjectNavigation } from '../components/NavigationButtons'

<article>
<div className="container">

<TopNavigation />

<div className="section-margin">
  
  # How we reduce User Confusion and Support Load

</div>

<section className="section-margin">

#### Context

I worked at Selectel, one of the leading cloud and data center service providers in Russia. I was responsible for the full user experience, including research and design, for the CDN and Cloud Storage products.

In this case, I want to share a story about one specific challenge we faced while improving the CDN product. At some point, we noticed a large number of support requests — over 40% of them were about the resource status. Many users didn't understand when the CDN becomes active, how to connect a custom domain, or how to check if the setup was completed successfully.
</section>

<section className="section-margin">

#### Research

<div className="columns">
  <div>
    I started by reviewing the full user path — from the product page to resource creation. I looked at how users behave and found points in the path where about 30% of customers drop out. Users of CDN are 2 segments business users(Website owners, course creators, small teams) and Technical users (Sysadmins, developers, DevOps engineers). The issue mostly affected non-technical users who relied on the UI instead of reading documentation.

    I reviewed more than 2,000 support tickets and watched more than 100 user web sessions.
  </div>
  <div>
    <img src="/img/story-redesign/storyRedesign-2.png" alt="User Journey Analysis" className="image image-with-border"/>
    <img src="/img/story-redesign/storyRedesign-3.png" alt="Usability testing" className="image image-with-border"/>
  </div>
</div>
</section>

<section className="section-margin">
 <span className="feedback-box">

  Users filled out the form, clicked "Create", didn’t see feedback, and got confused. Some saw a blocked button and didn’t know what to do
  </span>

</section>

<section className="section-margin">

#### Usability Testing

I prepared interactive prototypes and conducted usability testing with non-technical users. The tests went smoothly and revealed no critical issues.

<img src="/img/story-redesign/storyRedesign-5.png" alt="Prototypes" className="image"/>
 

</section>

<section className="section-margin">

  #### Design

  <div>
   We’ve added a verification screen with CNAME setup tips, helpful instructions, and a built-in checker to confirm everything is working.
  </div>

  <div className="image-grid">
      <img src="/img/story-redesign/Selectel_default_domain.png" alt="Selectel default domain" className="image"/>
      <img src="/img/story-redesign/Selectel_default_domain_after_check.png" alt="Domain after check" className="image"/>
  </div>
</section>

<section className="section-margin">

   We’ve improved the resource creation form by adding custom domain and SSL fields, automating protocol selection, and showing a low-balance warning.
  

<img src="/img/story-redesign/Selectel_form.png" alt="Selectel form" className="image"/>

</section>

<section className="section-margin">

#### Results

<div className="columns">
  <div className="feedback-box">
    Support requests dropped from 40% to 10%

   <p> A clear sign the new UI was easier to use</p>
  </div>
  <div className="feedback-box">
    Faster support

  <p>Team used built-in validation instead of external tools</p>
  </div>
</div>
<div className="feedback-box">
  Faster troubleshooting

  <p>Users started sending screenshots of test results, making it easier to help</p>
</div>
</section>


<ProjectNavigation nextProject={{ title: "Hackathons", link: "/hackathons" }} />

</div>
</article>