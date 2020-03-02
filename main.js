
let arrs = {
    arrCode : ['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace','Tab','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash','Delete','CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter','ShiftLeft','En','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ArrowUp','ShiftRight','ControlLeft','AltLeft','Space','AltRight','ControlRight','ArrowLeft','ArrowDown','ArrowRight'],
    arrEn : ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace','Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del','CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter','Shift','En','z','x','c','v','b','n','m',',','.','/','ᐃ','↑','Ctrl','Alt','Space','Alt','Ctrl','ᐊ','ᐁ','ᐅ'],
    arrEnShift : ['~','!','@','#','$','%','^','&','*','(',')','_','+','Backspace','Tab','Q','W','E','R','T','Y','U','I','O','P','{','}','|','Del','CapsLock','A','S','D','F','G','H','J','K','L',':','"','Enter','Shift','En','Z','X','C','V','B','N','M','<','>','?','ᐃ','↑','Ctrl','Alt','Space','Alt','Ctrl','ᐊ','ᐁ','ᐅ'],
    arrRu : ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace','Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Del','CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter','Shift','Ру','я','ч','с','м','и','т','ь','б','ю','.','ᐃ','↑','Ctrl','Alt','Space','Alt','Ctrl','ᐊ','ᐁ','ᐅ'],
    arrRuShift : ['Ё','!','"','№',';','%',':','?','*','(',')','_','+','Backspace','Tab','Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ','|','Del','CapsLock','Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э','Enter','Shift','Ру','Я','Ч','С','М','И','Т','Ь','Б','Ю',',','ᐃ','↑','Ctrl','Alt','Space','Alt','Ctrl','ᐊ','ᐁ','ᐅ'],
}



// Class

class Key{
    constructor(arrs){
        this.arrEn = arrs.arrEn,
        this.arrCode = arrs.arrCode,
        this.arrEnShift = arrs.arrEnShift,
        this.arrRu = arrs.arrRu,
        this.arrRuShift = arrs.arrRuShift
    }

    createTextarea() {
        let text = document.createElement('textarea');
        text.setAttribute('autofocus','');      
        document.body.appendChild(text);
        return this
    }

    createKey(val) {
        let div = document.createElement('div');
        div.innerHTML = val;
        document.body.appendChild(div);
    }

    createKeybord() {
        let arr = this.arrEn;

        if (localStorage.getItem('lang') == 'ru'){
            arr = this.arrRu
        } 

        let arrCode = this.arrCode;
        arr.forEach(element => {
            this.createKey(element);
        });

        //Styles and Classes

        let divs = document.querySelectorAll('div');
        divs.forEach(function (el,i) {
            if (el.textContent == 'Backspace' || el.textContent == 'CapsLock' || el.textContent == 'Enter' || el.textContent == 'Shift') {
            el.classList.add('back')
            } else if(el.textContent == 'Space') {
            el.classList.add('space')
            } 
            if(!(/^.$/.test(el.textContent)) || el.textContent == '↑' || el.textContent == 'ᐊ' || el.textContent == 'ᐁ' 
                || el.textContent == 'ᐅ' || el.textContent == 'ᐃ'){
                el.classList.add('special')
            }

            el.classList.add('key'+i);
            el.classList.add(arrCode[i]);
        });

        // Class active

        document.body.addEventListener('keydown', function(e){        
            
            for(let i = 0 ; i < arrCode.length ; i++){
                if(e.code == arrCode[i]){
                divs[i].classList.add('keyDown');
        
                document.addEventListener('keyup',()=> divs[i].classList.remove('keyDown'));
                }
        
            }
            
        });

        document.body.addEventListener('mousedown', function(e){       
        
            for(let i = 0 ; i < arrCode.length ; i++){
                if(e.target.classList.contains(`key${i}`)){
                    divs[i].classList.add('keyDown');
        
                    document.addEventListener('mouseup',()=> divs[i].classList.remove('keyDown'));
                }
        
            }
            
        });

        return this
    }

    input(){
        document.addEventListener('mousedown', (e) =>{
            e.preventDefault();

            let texterea = document.querySelector('textarea');
            texterea.focus();
            let divs = document.querySelectorAll('div');

            divs.forEach((element,i,arr)=>{
                if(e.target==element && !element.classList.contains('special')){
                    texterea.value += element.textContent
                }else if (e.target==element && e.target.textContent == 'Space'){
                    texterea.value += ' '
                }
            });

        });

        // Shift && Caps

        document.addEventListener('keydown',(e)=>{
            let divs = document.querySelectorAll('div');

            if(divs[43].textContent == 'En'){
                if (e.code == 'ShiftLeft' || e.code == 'ShiftRight' ){
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = this.arrEnShift[i]
                    });
    
                    document.addEventListener('keyup',(e,i)=>{
                        if (e.code == 'ShiftLeft' || e.code == 'ShiftRight' ){
                            divs.forEach((element,i,arr)=>{
                            element.innerHTML = this.arrEn[i]
                        });
                        }
                    });    
                }
            }else if (divs[43].textContent =='Ру'){
                if (e.code == 'ShiftLeft' || e.code == 'ShiftRight' ){
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = this.arrRuShift[i]
                    });
    
                    document.addEventListener('keyup',(e,i)=>{
                        if (e.code == 'ShiftLeft' || e.code == 'ShiftRight' ){
                            divs.forEach((element,i,arr)=>{
                            element.innerHTML = this.arrRu[i]
                        });
                        }
                    });    
                }
            }
            
            
        });

        document.addEventListener('keydown',(e)=>{
            let divs = document.querySelectorAll('div');

                if (e.code == 'CapsLock' ){
                    divs.forEach((element,i,arr)=>{
                        if (!element.classList.contains('special') && !element.classList.contains('upperCase')){
                            element.textContent = element.textContent.toUpperCase();
                            element.classList.add('upperCase');
                            divs[29].classList.add('caps');
                            
                        } else if (!element.classList.contains('special') && element.classList.contains('upperCase')){
                            element.textContent = element.textContent.toLowerCase();
                            element.classList.remove('upperCase');
                            divs[29].classList.remove('caps');
                        }
                    });   
                }
            
            
        });

        document.addEventListener('mousedown',(e)=>{
            let divs = document.querySelectorAll('div');

            if(divs[43].textContent == 'En'){
                if (e.target.textContent == 'Shift' || e.target.textContent == '↑' ){
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = this.arrEnShift[i]
                    });
    
                    document.addEventListener('mouseup',(e,i)=>{
                        if (e.target.textContent == 'Shift' || e.target.textContent == '↑' ){
                            divs.forEach((element,i,arr)=>{
                            element.innerHTML = this.arrEn[i]
                        });
                        }
                    });    
                }
            }else if (divs[43].textContent =='Ру'){
                if (e.target.textContent == 'Shift' || e.target.textContent == '↑' ){
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = this.arrRuShift[i]
                    });
    
                    document.addEventListener('mouseup',(e,i)=>{
                        if (e.target.textContent == 'Shift' || e.target.textContent == '↑' ){
                            divs.forEach((element,i,arr)=>{
                            element.innerHTML = this.arrRu[i]
                        });
                        }
                    });    
                }
            }
            
            
        });


        document.addEventListener('mousedown',(e)=>{
            let divs = document.querySelectorAll('div');

                if (e.target.textContent == 'CapsLock' ){
                    divs.forEach((element,i,arr)=>{
                        if (!element.classList.contains('special') && !element.classList.contains('upperCase')){
                            element.textContent = element.textContent.toUpperCase();
                            element.classList.add('upperCase');
                            e.target.classList.add('caps');
                        } else if (!element.classList.contains('special') && element.classList.contains('upperCase')){
                            element.textContent = element.textContent.toLowerCase();
                            element.classList.remove('upperCase');
                            e.target.classList.remove('caps');
                        }
                    });   
                }
            
            
        });
        

        // Layout

        document.addEventListener('keydown',(e)=>{
            let divs = document.querySelectorAll('div');
            let arrRu = this.arrRu;
            let arrEn = this.arrEn;

            if(e.shiftKey && e.altKey && divs[43].textContent == 'En'){
                document.addEventListener('keyup',(e,i)=>{
                    divs[43].textContent == 'Ру'
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = arrRu[i]
                    });

                    localStorage.setItem('lang', 'ru');
                })
                
            } else if (e.shiftKey && e.altKey && divs[43].textContent == 'Ру'){
                document.addEventListener('keyup',(e,i)=>{
                   divs[43].textContent == 'En'
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = arrEn[i]
                    });
                });
                localStorage.setItem('lang', 'en');
            }
        });

        document.addEventListener('click',(e)=>{
            let divs = document.querySelectorAll('div');
            let arrRu = this.arrRu;
            let arrEn = this.arrEn;

            if(e.target.textContent == 'En'){
                    divs[43].textContent == 'Ру'
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = arrRu[i]  
                    });
                localStorage.setItem('lang', 'ru');
            } else if (e.target.textContent == 'Ру'){
                   divs[43].textContent == 'En'
                    divs.forEach((element,i,arr)=>{
                        element.innerHTML = arrEn[i]
                    });
                localStorage.setItem('lang', 'en');
            }
        });


        // Del && Back && ᐊ ᐁ ᐅ ᐃ

        document.addEventListener('click',(e)=>{
            let textarea = document.querySelector('textarea');
            if (e.target.classList.contains('Backspace')){
                let position = textarea.selectionStart;
                textarea.value = textarea.value.slice(0,textarea.selectionStart - 1) + textarea.value.slice(textarea.selectionStart );
                textarea.selectionStart = textarea.selectionEnd = position - 1;
            }else if (e.target.classList.contains('Delete')){
                let position = textarea.selectionStart;
                textarea.value = textarea.value.slice(0,textarea.selectionStart) + textarea.value.slice(textarea.selectionStart + 1);
                textarea.selectionStart = textarea.selectionEnd = position;
            }else if (e.target.classList.contains('ArrowLeft')){
                textarea.selectionStart = textarea.selectionEnd -= 1;
            }else if (e.target.classList.contains('ArrowRight')){
                textarea.selectionStart = textarea.selectionEnd += 1;
            }else if (e.target.classList.contains('ArrowUp')){
                textarea.selectionStart = textarea.selectionEnd -= 82;
            }else if (e.target.classList.contains('ArrowDown')){
                textarea.selectionStart = textarea.selectionEnd += 82;
            }    
        });

    }

}

//Create Keyboard

let keybord = new Key(arrs);
keybord.createTextarea().createKeybord().input();



