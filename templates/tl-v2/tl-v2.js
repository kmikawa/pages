async function fetchSteps() {
    window.hlx.dependencies.push('steps.json');
    const resp=await fetch('steps.json');
    const json=await resp.json();
    return (Array.isArray(json) ? json : json.data);
}

function getThumbnail(step) {
    let thumbnail=step.Thumbnail;
    if (!thumbnail) {
        if (step.Video.startsWith('https://www.youtube.com')) {
            const yturl=new URL(step.Video);
            const vid=yturl.searchParams.get('v');    
            thumbnail=`https://img.youtube.com/vi/${vid}/0.jpg`;
        }
    }
    return (thumbnail);
}


function addNavCarrot() {
    if(document.querySelector('header svg') || document.querySelector('header img')) {
        let svg = document.querySelector('header svg') || document.querySelector('header img');
        let svgWithCarrot = document.createElement('div');
        svgWithCarrot.classList.add('nav-logo');

        svgWithCarrot.innerHTML = `
        <span class="product-icon">
            ${svg.outerHTML}
        </span>

        <span class="carrot">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
        `;
        svg.remove();
        document.querySelector('header div')
        .prepend(svgWithCarrot);
        document.querySelector('header').classList.add('default-nav')

    

        if(document.querySelector('header .section-wrapper p')) {
            let productName = document.querySelector('header .section-wrapper').children[1].querySelector('p')
            document.querySelector('.product-icon').appendChild(productName)            
        }

    }
}



async function insertSteps() {
    const $steps=document.querySelector('main div.steps');
    if ($steps) {
        const steps=await fetchSteps();
        if(steps[0].Category) {
            
            
            let titles = [];
            let stepGroups = [];
            let markup = '';
            steps.forEach((stepsType) => {
                if(!titles.includes(stepsType.Category)) {
                    titles.push(stepsType.Category)
                    stepGroups.push({
                        Category: stepsType.Category,
                        title: stepsType.Category_Title,
                    });
                } 
            })
            
            stepGroups.forEach((stepsNest) => {
                
                markup += `
                    <div class="row">
                        <div class="row-title">
                            <h3>${stepsNest.title}</h3>
                        </div>
                `
                
                if(step.Thumbnail.includes('http')) {
                    console.log('has external link')
                } else {
                    console.log('does not contain external link')
                }

                markup += `<div class="steps">`
                
                steps.forEach((step, i) => {
                    if(step.Category === stepsNest.Category) {
                        markup += `
                        <div class="card" onclick="window.location='step?${i+1}'">
                    <div class='img' style="background-image: url(../../../static/ete/${step.Thumbnail})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="731" height="731" viewBox="0 0 731 731">
                    <g id="Group_23" data-name="Group 23" transform="translate(-551 -551)">
                        <circle id="Ellipse_14" data-name="Ellipse 14" cx="365.5" cy="365.5" r="365.5" transform="translate(551 551)" fill="#1473e6"/>
                        <path id="Polygon_3" data-name="Polygon 3" d="M87.5,0,175,152H0Z" transform="translate(992.5 829.5) rotate(90)" fill="#fff"/>
                    </g>
                    </svg>
                    </div>
                    <div class='text'>
                        <div><h4>${step.Title.replace('\n', '<br>')}</h4>
                        <p>${step.Description.replace('\n', '<br>')}</p>
                        </div>
                        <a href="step?${i+1}">${step.CTA}</a>
                    </div>
                </div>
                        
                        `
                    }
                })
                markup += `</div> </div>`
            })

            $steps.innerHTML=markup;
            // console.log(markup)

        } else {
            let html='';
            steps.forEach((step, i) => {
                let setThumbnail;

                if(step.Thumbnail.includes('http')) {
                    setThumbnail = step.Thumbnail
                } else {
                    setThumbnail = ` ../../../../static/ete/hero-posters/${getThumbnail(step)}`
                }
                html+=`<div class="card" onclick="window.location='step?${i+1}'">
                    <div class='img'>
                    <img src="${setThumbnail}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="731" height="731" viewBox="0 0 731 731">
                    <g id="Group_23" data-name="Group 23" transform="translate(-551 -551)">
                        <circle id="Ellipse_14" data-name="Ellipse 14" cx="365.5" cy="365.5" r="365.5" transform="translate(551 551)" fill="#1473e6"/>
                        <path id="Polygon_3" data-name="Polygon 3" d="M87.5,0,175,152H0Z" transform="translate(992.5 829.5) rotate(90)" fill="#fff"/>
                    </g>
                    </svg>
                    </div>
                    <div class='text'>
                      <div class="icons">
                        <div class="icons__item">
                          <img src="../../../../icons/${step.Product_icon_1.toLowerCase()}.svg">
                        </div>
                        <div class="icons__item">
                          <img src="../../../../icons/${step.Product_icon_2.toLowerCase()}.svg">
                        </div>
                      </div>
                      <div class="card-content"> 
                        <h4>${step.Title}</h4>
                        <p>${step.Description}</p>
                      </div>
                      <a href="step?${i + 1}">${step.CTA}</a>
                    </div>
                </div>`
            })
            $steps.innerHTML=html;
        }
    }
}



function dropDownMenu() {
  let $header = document.querySelector('header');

  if(window.outerWidth >= 768) return;

  if(!$header.classList.contains('nav-showing')) {
    $header.querySelector('ul').style.display = 'flex';
    $header.classList.add('nav-showing')
  } else {
    $header.querySelector('ul').style.display = 'none';
    $header.classList.remove('nav-showing')
  }
}



let is_video_playing = false;


export function playVideo() {
    document.getElementById('placeholder').classList.add('hidden');
    const $video=document.getElementById('video');
    $video.classList.remove('hidden');
    $video.classList.remove('hidden');
    if(!is_video_playing) {
        $video.play();
        $video.setAttribute('controls', true)
        is_video_playing = true;
    } 

}

async function decorateStep() {
    document.body.classList.add('step');
    classify('main>div:first-of-type', 'content');
    classify('main>div:nth-of-type(2)', 'learn');
    classify('main>div:nth-of-type(3)', 'progress');
    classify('main>div:nth-of-type(4)', 'upnext');

    const $content=document.querySelector('.content');
    const $learn=document.querySelector('.learn');
    const $progress=document.querySelector('.progress');
    const $upnext=document.querySelector('.upnext');

    const $video=createTag('div', {class: 'video-wrapper'});
    $content.appendChild($video);

    const stepIndex=(+window.location.search.substring(1).split('&')[0])-1;
    const steps=await fetchSteps();
    const currentStep=steps[stepIndex];

    //fill content section

    const $h1=document.querySelector('main .content>h1');
    let title=currentStep.Title;
    if (currentStep.Heading) title=currentStep.Heading;
    title=title.replace('\n', '<br>');
    $h1.innerHTML=title;
    let iconParent = document.createElement("div");
    iconParent.setAttribute("class", "icons_parent");
    iconParent.innerHTML = `
    <div class="icons_parent__item"><img src="../../../../icons/${currentStep.Product_icon_1.toLowerCase()}.svg"></div>
    <div class="icons_parent__item"><img src="../../../../icons/${currentStep.Product_icon_2.toLowerCase()}.svg"></div>`;

    $h1.id='';

    document.querySelector("main .content").prepend(iconParent);
    
    // for (let i=0;i<8;i++) {
    //     $h1.appendChild(createTag('span', {class: 'grab-'+i}))
    // }
    document.title=currentStep.Title;
    if (currentStep['Practice File']) {
        document.querySelector('main .content>p>a').setAttribute('href', currentStep['Practice File']);
        console.log(currentStep['Next_file'], currentStep)
    }
    let all_ctas = document.querySelectorAll('main .content>p>a');
    if(all_ctas.length >= 2) {
        if(currentStep['Next_file']) {
            document.querySelector('main .content>p>a:nth-of-type(2)').setAttribute('href', currentStep['Next_file']);
            document.querySelector('main .content>p>a:nth-of-type(2)').classList.add('secondary')
        } else {
            document.querySelector('main .content>p>a:nth-of-type(2)').remove();
        }
    }

    if (currentStep.Video.startsWith('https://images-tv.adobe.com')) {
        $video.innerHTML=`<div class="video"><div id="placeholder" class="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="731" height="731" viewBox="0 0 731 731">
                <g id="Group_23" data-name="Group 23" transform="translate(-551 -551)">
                    <circle id="Ellipse_14" data-name="Ellipse 14" cx="365.5" cy="365.5" r="365.5" transform="translate(551 551)" fill="#1473e6"/>
                    <path id="Polygon_3" data-name="Polygon 3" d="M87.5,0,175,152H0Z" transform="translate(992.5 829.5) rotate(90)" fill="#fff"/>
                </g>
                </svg>
        </div>
        <video id='video' class="hidden" preload="metadata" src="${currentStep.Video}" tabindex="0">
        <source src="${currentStep.Video}" type="video/mpeg4">
        </video></div>`;
        $video.firstChild.style.backgroundImage=`url(${currentStep.Thumbnail})`;
        $video.firstChild.addEventListener('click', (e) => playVideo());
    }

    if (currentStep.Video.startsWith('https://www.youtube.com/')) {
        const yturl=new URL(currentStep.Video);
        const vid=yturl.searchParams.get('v');
        $video.innerHTML=`<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://www.youtube.com/embed/${vid}?rel=0" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media; accelerometer; gyroscope; picture-in-picture"></iframe></div>`;

    }

    //fill learn section

    let skills=[]
    while (currentStep['Skill '+(skills.length+1)]) {
        skills.push({
            title: currentStep['Skill '+(skills.length+1)].replace('\n', '<br>'), 
            icon: currentStep['Skill '+(skills.length+1)+' Icon']
        });
    }
    const $skills=createTag('div',{class: 'skills'});
    let html='';

    skills.forEach((skill) => {
        html+=`<div class="skill"><img src="/static/twp3/icons/${skill.icon}.svg">
            <p>${skill.title.replace('\n', '<br>')}</p></div>`;
    })
    $skills.innerHTML=html;
    $learn.appendChild($skills);

    //fill progress section

    const splits=$progress.innerHTML.split("#");
    $progress.innerHTML=splits[0]+(stepIndex+1)+splits[1]+(steps.length)+splits[2];

    const $progressbar=createTag('div',{class: 'progress-bar'});
    html='';
    steps.forEach((step,i) => {
        html+=`<div onclick="window.location.href='step?${i+1}'" class="${i==stepIndex?'active':'inactive'}"></div>`
    })
    $progressbar.innerHTML=html;
    $progress.appendChild($progressbar);


    // fill up next

    var upnext=$upnext.innerHTML;

    const nextStep=steps[stepIndex+1];
    if (nextStep) {
        $upnext.innerHTML=` <div class="upnext__inner">
                              <div class="window">
                                <img src="${getThumbnail(nextStep)}">
                              </div>
                              ${upnext}
                              <h2>${nextStep.Title.replace('\n', '<br>')}</h2>
                              <p>${nextStep.Description.replace('\n', '<br>')}</p>
                            </div>
        
                `;
    } else {
        $upnext.remove();
    }
    
    $upnext.addEventListener('click', (e) => window.location.href=`step?${stepIndex+2}`)

}

function wrapSections(element) {
    document.querySelectorAll(element).forEach(($div) => {
        const $wrapper=createTag('div', { class: 'section-wrapper'});
        $div.parentNode.appendChild($wrapper);
        $wrapper.appendChild($div);
    });
}



async function decorateHome() {
    document.body.classList.add('home');
    document.querySelectorAll('main p').forEach(($e) => {
        const inner=$e.innerHTML.toLowerCase().trim();
        if (inner == "&lt;steps&gt;" || inner == '\\<steps></steps>') {
                $e.parentNode.classList.add('steps');
            $e.parentNode.innerHTML='';
        }
    })
    await insertSteps();

}

let debounce = function (func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// set fixed height to cards to create a uniform UI
function cardHeightEqualizer($el) {
  let initialHeight = 0;
  let element = document.querySelectorAll($el);

  if (window.innerWidth >= 700 && element.length > 1) {
    element.forEach(function (card_el) {
      card_el.style.height = "auto";
    });

    element.forEach(function (card_text) {
      if (initialHeight < card_text.offsetHeight) {
        initialHeight = card_text.offsetHeight;
      }
    });

    element.forEach(function (card_el) {
      card_el.style.height = initialHeight + "px";
    });
  } else {
    element.forEach(function (card_el) {
      card_el.style.height = "auto";
    });
  }
}

window.addEventListener("resize", debounce(function () {
    // run resize events
    cardHeightEqualizer(".card-content");
  }, 250)
);

async function decoratePage() {
    addDefaultClass('main>div');

    await loadLocalHeader();

    externalLinks('header');
    externalLinks('footer');
    wrapSections('header>div');
    // nav style/dropdown
    addNavCarrot();
  

    if(document.querySelector('.nav-logo')) {
      document.querySelector('.nav-logo').addEventListener('click', dropDownMenu)
    }

    let pageType;
    //find steps marker
    if (document.location.pathname.endsWith('/step')) {
        pageType = 'step';
    } else {
        pageType = 'home';
    }

    window.pages.pageType = pageType;

    if (pageType == 'home') {
        await decorateHome();
    }

    if (pageType == 'step') {
        await decorateStep();
    }

    window.pages.decorated = true;
    appearMain();
    cardHeightEqualizer(".card-content");
}

if (document.readyState == 'loading') {
    window.addEventListener('DOMContentLoaded', (event) => {
        decoratePage();
    });
} else {
    decoratePage();
}


