window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    const infoHeader = document.querySelector('.info-header'),
        infoHeaderTab = document.querySelectorAll('.info-header-tab'),
        infoTabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < infoTabContent.length; i++) {
            infoTabContent[i].classList.remove('show');
            infoTabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (infoTabContent[b].classList.contains('hide')) {
            infoTabContent[b].classList.add('show');
            infoTabContent[b].classList.remove('hide');
        }
    }

    infoHeader.addEventListener('click',(event)=>{
        let target = event.target;
        console.log(target);
        if (target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < infoHeaderTab.length; i++) {
                if (target == infoHeaderTab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    let deadline = '2021-10-20';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60));

        return {
            'total':t,
            'hours':hours,
            'minutes':minutes,
            'seconds':seconds
        };

    }
    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
            let t = getTimeRemaining(endtime);
            if(Math.floor(t.seconds/10) == 0){
                seconds.textContent = '0' + t.seconds;
            }else{
                seconds.textContent = t.seconds;
            };
            if(Math.floor(t.hours/10) == 0){
                hours.textContent = '0' + t.seconds;
            }else{
                hours.textContent = t.hours;
            };
            if(Math.floor(t.minutes/10) == 0){
                minutes.textContent = '0' + t.seconds;
            }else{
                minutes.textContent = t.minutes;
            };
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);
    let more = document.querySelector('.more'),
        modal = document.querySelector('.overlay'),
        cross = document.querySelector('.popup-close');
        
    more.addEventListener('click',()=>{
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    cross.addEventListener('click',()=>{
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });


    let descriptionButton = document.querySelectorAll('.description-btn');
    for (let i = 0;i < descriptionButton.length;i++){
        descriptionButton[i].addEventListener('click',()=>{
            modal.style.display = 'block';
        });
    }

    class options {

        constructor(height,width,bg,fontSize,textAlign,color){
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
            this.color = color;
        }
    
        drow(){
            let parent = document.querySelector('.main'),
                div = document.createElement('div');

            div.innerHTML = 'О';
            div.style.cssText = `width:${this.width};height:${this.height};background-color:${this.bg};font-size:${this.fontSize};text-align:${this.textAlign};color:${this.color}`;
            parent.append(div);
        }
    };
    
    let first = new options('200px','200px','#c78030','240px','center','white');
    first.drow();

    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('.form-colleration'),
        input = document.querySelectorAll('.popup-form__input'),
        statusMessage = document.createElement('div');

    statusMessage.style.color = 'white';
    statusMessage.classList.add('status');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST','server.php');
        // request.setRequestHeader('Content-type','application/x-www-form-urlecoded');
        request.setRequestHeader('Content-type','application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};

        formData.forEach(function(value,key){
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange',()=>{
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            }else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < input.length;i++) {
            input[i].value = '';
        }
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        contactForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST','server.php');
        // request.setRequestHeader('Content-type','application/x-www-form-urlecoded');
        request.setRequestHeader('Content-type','application/json; charset=utf-8');

        let formData = new FormData(contactForm);

        let obj = {};

        formData.forEach(function(value,key){
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange',()=>{
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            }else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < input.length;i++) {
            input[i].value = '';
        }
    });
});
