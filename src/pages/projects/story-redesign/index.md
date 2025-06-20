---
title: How we reduce User Confusion and Support Load
description: A case study of the redesign process, UX improvements, and Design System development at Selectel
hide_table_of_contents: true
image: /img/story-redesign/storyRedesign-1.png
---

import '../../../styles/project-page.css'
import { ProjectNavigation } from '../../../components/navigation-buttons/NavigationButtons'
import Footer from '../../../components/footer/Footer'

<article>
<div className="container">

  
# Users created a CDN resource and couldn't figure out, “Does it even work?”
 

<section className="section-margin">
 <div className="columns">
   
    <p>Selectel is one of the leading cloud and data center service providers in Russia. One of the company’s products is a CDN — a service that helps deliver data equally fast to all users, no matter how far away they are.</p>
   
    <p>I was responsible for the full user experience, including research and design, for the CDN and Cloud Storage products. </p> 
  </div>
  <img src="/img/story-redesign/Cover_Selectel.png" alt="Selectel Cover" className="image"/>
  
</section>






<section className="section-margin">

 ### Problem
 At CDN product we have a large number of support requests — over 40% of them were about the resource status. Many users didn't understand when the CDN becomes active, how to connect a custom domain, or how to check if the setup was completed successfully. 

 </section>

<section className="section-margin">

  ### Research

<div className="columns">
    <div>
      <img src="/img/story-redesign/storyRedesign-2.png" alt="User Journey Analysis" className="image"/>
      <img src="/img/story-redesign/storyRedesign-3.png" alt="Usability testing" className="image"/>
    </div>
    <div>
       #### I analyzed over <span> 2,000 support </span> tickets and watched <span> 100+ user sessions </span> and reviewed the full user journey from product page to resource creation and found key drop-off points where around 30% of users left. 

       Users filled out the form, clicked "Create", didn't see feedback, and got confused. Some saw a blocked button and didn't know what to do. This mostly affected non-technical users who relied on the UI.
    </div>
</div>

</section>



<section className="section-margin">

### Prototyping and usability testing

<div className="columns">
I prepared interactive prototypes and conducted usability testing with non-technical users. The tests went smoothly and revealed no critical issues.
</div>

<img src="/img/story-redesign/storyRedesign-5.png" alt="Prototypes" className="image"/>
 

</section>

<section className="section-margin">

  ### Design
   We've added a verification screen with CNAME setup tips, helpful instructions, and a built-in checker to confirm everything is working.


  <div className="columns">
      <img src="/img/story-redesign/Selectel_default_domain.png" alt="Selectel default domain" className="image"/>
      <img src="/img/story-redesign/Selectel_default_domain_after_check.png" alt="Domain after check" className="image"/>
  </div>
</section>

<section className="section-margin">
   We've improved the resource creation form by adding custom domain and SSL fields, automating protocol selection, and showing a low-balance warning.
  

<img src="/img/story-redesign/Selectel_form.png" alt="Selectel form" className="image"/>

</section>

<section className="section-margin">

### Results

  <div className="columns">

    <div>
      The percentage of support requests related to CDN resource configuration reduced <span>from 40% to 10%</span>
    </div>
    <div>
      Support <span>team members use panel validation</span> instead of external services to help customers
    </div>
    <div>
      The <span>response time</span> to a customer on a configuration issue was <span>reduced</span>, because users began to attach a screenshot of the test result to the request
    </div>
  </div>

</section>


<section className="section-margin">

### P.S.

   Alongside my work on product tasks, I collaborated with designers from other teams to improve our design system. We created new components, discussed and documented design patterns, and developers implemented them in code. 
  
<img src="/img/story-redesign/DS.png" alt="Design System" className="image"/>

As a result, the entire panel interface now looks fresher and more minimalistic — including the CDN resource creation form.

<img src="/img/story-redesign/storyRedesign-9.jpg" alt="Selectel form" className="image"/>  
   
 
</section>


<ProjectNavigation nextProject={{ title: "Marquiz", link: "/projects/marquiz-act-requests" }} />


</div>
</article>
<Footer />