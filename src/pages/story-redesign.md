---
description: A case study of the redesign process and UX improvements at Selectel
hide_table_of_contents: true
image: /img/story-redesign/storyRedesign-1.png
---

<article>
<div className="container">

<div className="top-navigation">
<a href="/" className="link">← Back to Home</a>
</div>

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

<div className="two-column">
  <div>
    I started by reviewing the full user path — from the product page to resource creation. I looked at how users behave and found points in the path where about 30% of customers drop out. Users of CDN are 2 segments business users(Website owners, course creators, small teams) and Technical users (Sysadmins, developers, DevOps engineers). The issue mostly affected non-technical users who relied on the UI instead of reading documentation.

    I reviewed more than 2,000 support tickets and watched more than 100 user web sessions.
  </div>
  <div>

    ![User Journey Analysis](/img/story-redesign/storyRedesign-2.png)
    ![Usability testing](/img/story-redesign/storyRedesign-3.png)
  </div>
</div>
</section>

<section className="section-margin">

### Users filled out the form, clicked "Create", didn’t see feedback, and got confused. Some saw a blocked button and didn’t know what to do.
</section>

<section className="section-margin">

#### Usability Testing

I prepare interactive prototypes and did usability testing with non-technical specialists. It was successful without critical difficulties.

![Usability testing](/img/story-redesign/storyRedesign-4.png)

</section>

<section className="section-margin">

#### Design

<div className="two-column">
  <div>
    Improved the resource creation form

    - Added fields for custom domain and SSL
    - Made protocol selection automatic
    - Added a low-balance warning
  
  <div className="two-column">

  ![Usability testing](/img/story-redesign/Selectel_default_domain_after_check.png)
 
  </div>
  </div>
  
  
</div>
</section>

<section className="section-margin">

#### Added a verification screen

- Tips for configuring CNAME
- Help buttons with clear, short instructions
- A built-in checker to confirm setup status

<div className="two-column"> 

![Selectel default domain](/img/story-redesign/Selectel_default_domain.png)

</div>

</section>

<section className="section-margin">

#### Results

<div className="two-column">
  <div>
    **Support requests dropped from 40% to 10%**
    A clear sign the new UI was easier to use
  </div>
  <div>
    **Faster support**
    Team used built-in validation instead of external tools
  </div>
</div>
<div className="two-column">
  <div>
  </div>
  <div>
    **Faster troubleshooting**
    Users started sending screenshots of test results, making it easier to help
  </div>
</div>
</section>


<div className="project-navigation">
<a href="/" className="link">← Back to Home</a>
<div>
  <a href="/projects/hackathons" className="link">Hackathons</a>
  <a href="/projects/selectel-design-system" className="link">Selectel Design System</a>
</div>
</div>

</div>
</article>