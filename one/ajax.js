
    
    function ajax(params) {
        var _default = {
            method: 'GET', 
            url: 'null', 
            data: null, 
            timeout: 1000,
            dataType: 'json'
        }
        for(var i in params) {
          
            _default[i] = params[i];
        }
        var xhr = new XMLHttpRequest()
        for(var item in  _default.data) {
            if(_default.url.indexOf('?') == -1) {
                _default.url += '?' + Date.now();
            } else {
                _default.url += '&' + Date.now();
            }
        }
        xhr.open(_default.method, _default.url,true);
        if (_default.dataType == 'json') {
            _default.data = JSON.stringify(_default.data);
        }
        _default.data = _default.method == 'GET' ? null : _default.data;
        xhr.send(_default.data);
        return new Promise(function(resolved, reject){
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    var json = xhr.responseText;
                    json = _default.dataType == 'json' ? JSON.parse(json) : json;
                    resolved(json);
                    
                }
            }
        }).then(cb)
        
        function cb(a){
            let msg=document.querySelector('.msg')
            let _box=document.querySelector('.box')
            let big=document.querySelector('.big')
            let del=document.querySelector('.del')
            let no=document.querySelector('.no')
            for(let i=0;i<a.length;i++){
                let tr=document.createElement('tr')
                for(let j in a[i]){
                    let td=document.createElement('td')
                    td.innerHTML=a[i][j]
                    tr.appendChild(td)
                }
                let btn=document.createElement('button')
                btn.innerHTML='删除'
                tr.appendChild(btn)
                _box.children[0].appendChild(tr)
            }
            _box.onclick=function(ev){
                ev=ev||window.event
                target=ev.target||ev.srcElement
                if(target.nodeName=='BUTTON'){
                    big.style.display="block"
                    del.onclick=function(){
                        target.parentNode.remove()
                        big.style.display="none"
                        msg.style.marginLeft="-"+150+"px"
                    msg.style.marginTop="-"+150+"px"
                        msg.style.left="50%"
                        msg.style.top="50%"
                    }
                    no.onclick=function(){
                        big.style.display="none"
                        msg.style.marginLeft="-"+150+"px"
                        msg.style.marginTop="-"+150+"px"
                        msg.style.left="50%"
                        msg.style.top="50%"
                    }
                    // 
                }
            }
        }
        
    }
    function moveWindow() {
        let msg=document.querySelector('.msg')
        let h2=document.querySelector('h2')
        this.boxTitle=document.createElement('h6')
        
        
        this.boxTitle.setAttribute('style','width:100%;height:40px;font:16px/40px "宋体";background:#c4bea6; text-align:center;cursor:crosshair;')
        let _this=this
        msg.insertBefore(_this.boxTitle,h2)
        this.boxTitle.innerText='可拖动窗口'
        
        this.boxTitle.onmousedown=function(ev){
            ev=ev||event.window
            let left=ev.offsetX
            let top=ev.offsetY
            document.onmousemove=function (ev) {
                ev=ev||event.window
                msg.style.margin=0
                msg.style.left=ev.clientX-left+'px'
                msg.style.top=ev.clientY-top+'px'
            }
        }
                document.onmouseup=function () {
                    
                    document.onmousemove=null
                }
        
    }
   