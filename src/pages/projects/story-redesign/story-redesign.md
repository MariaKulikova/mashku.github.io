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


<div className="section-margin">
  
  # How we reduce User Confusion and Support Load
  ---

  <div className="project-details">
    <div className="project-details-column">
     <a href="https://selectel.ru" target="_blank">Selectel </a>
     <p>Cloud and infrastructure provider with 6 data centers and 23,000+ customers </p>
    </div>
    <div className="project-details-column">
      <div className="tags">
        <span className="tag">Design System</span>
        <span className="tag">Product Design</span>
        <span className="tag">Component Library</span>
        <span className="tag">Documentation</span>
        <span className="tag">User Research</span>
        <span className="tag">Analytics</span>
      </div>
    </div>
  </div>



</div>

<section className="section-margin">

### Context

I worked at Selectel, one of the leading cloud and data center service providers in Russia. I was responsible for the full user experience, including research and design, for the CDN and Cloud Storage products.

In this case, I want to share a story about one specific challenge we faced while improving the CDN product. At some point, we noticed a large number of support requests — over 40% of them were about the resource status. Many users didn't understand when the CDN becomes active, how to connect a custom domain, or how to check if the setup was completed successfully.
</section>

<section className="section-margin">

### Research

<div className="columns">
  <div>
    I reviewed the full user journey from product page to resource creation and found key drop-off points where around 30% of users left. This mostly affected non-technical users who relied on the UI. 
    I analyzed over 2,000 support tickets and watched 100+ user sessions. 

    Users filled out the form, clicked "Create", didn't see feedback, and got confused. Some saw a blocked button and didn't know what to do
  </div>
  <div>
    <img src="/img/story-redesign/storyRedesign-2.png" alt="User Journey Analysis" className="image image-with-border"/>
    <img src="/img/story-redesign/storyRedesign-3.png" alt="Usability testing" className="image image-with-border"/>
  </div>
</div>
</section>


<section className="section-margin">

### Usability Testing

I prepared interactive prototypes and conducted usability testing with non-technical users. The tests went smoothly and revealed no critical issues.

<img src="/img/story-redesign/storyRedesign-5.png" alt="Prototypes" className="image"/>
 

</section>

<section className="section-margin">

  ### Design

  <div>
   We've added a verification screen with CNAME setup tips, helpful instructions, and a built-in checker to confirm everything is working.
  </div>

  <div className="image-grid">
      <img src="/img/story-redesign/Selectel_default_domain.png" alt="Selectel default domain" className="image"/>
      <img src="/img/story-redesign/Selectel_default_domain_after_check.png" alt="Domain after check" className="image"/>
  </div>
</section>

<section className="section-margin">

   We've improved the resource creation form by adding custom domain and SSL fields, automating protocol selection, and showing a low-balance warning.
  

<img src="/img/story-redesign/Selectel_form.png" alt="Selectel form" className="image"/>

</section>

<section className="section-margin">

### Design System Development

As part of improving the overall user experience, I helped develop a comprehensive design system for Selectel. The goal was to unify the design approach across all digital products and improve development efficiency.

I worked as part of a horizontal design team where we collaborated on patterns, naming conventions, and behavior standards. This unified approach helped create a system that met real needs across all products.

#### My Role in Design System
I contributed to the core structure and created key components like the Skeleton and Stepper, complete with clear documentation and behavior rules. I also led the navigation system improvements, which impacted all products.

</section>

<section className="section-margin">

### Stepper Component
<div class="columns">
  <div>
    <img src="/img/design-system/designSystem-6.png" alt="Stepper States" className="image"/>
    <img src="/img/design-system/designSystem-7.png" alt="Stepper Interactions" className="image"/>
  </div>
  <img src="/img/design-system/designSystem-5.png" alt="Stepper Overview" className="image"/>
  
</div>

</section>

<section className="section-margin">

### Skeleton Component
<div class="columns">
<img src="/img/design-system/designSystem-2.png" alt="Design System Structure" className="image"/>
<img src="/img/design-system/designSystem-3.png" alt="Component Architecture" className="image"/>
<div>
<img src="/img/design-system/designSystem-4.png" alt="Component Relationships" className="image"/>
</div>
</div>

</section>

<section className="section-margin">

### Navigation System
<div class="columns">
  <div>
    <img src="/img/design-system/designSystem-8.png" alt="Navigation Overview" className="image"/>
    <img src="/img/design-system/designSystem-10.png" alt="Navigation Patterns" className="image"/>
  </div>
  <div>
    <img src="/img/design-system/designSystem-9.png" alt="Navigation Components" className="image"/>
    <img src="/img/design-system/designSystem-11.png" alt="Navigation Implementation" className="image"/>
  </div>
</div>

</section>

<section className="section-margin">

### Results
<div className="columns">   

  <div className="highlight">   

  #### Support requests dropped from 40% to 10%
  A clear sign the new UI was easier to use
  
  </div>  

  <div className="highlight">  

   #### Unified Design System
   Built complete component library with tokens and documentation
  
  </div> 

  <div className="highlight">   

  #### Improved Efficiency
  Faster development cycles and better design-development workflow
 
  </div> 
 </div> 
</section>


<ProjectNavigation nextProject={{ title: "AI Car Assistant", link: "/projects/ai-car-assistant/ai-car-assistant" }} />

</div>
</article>
<Footer />