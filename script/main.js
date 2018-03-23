/** 
 *  Tars Wu
 *  https://github.com/janelin612
 */
const PADDING_IMAGE = 25;
var nextY = 0;
var app = new Vue({
    el: "#app",
    data: {
        fileSrc:null,
        title: "請輸入標題",
        list: [
            '項目1',
            '項目2'
        ],
        newListItem:"",
        paddLeftOfList:50,
        color:{
            bak:{r:45,g:45,b:45},
            title:{r:220,g:220,b:220},
            list:{r:200,g:200,b:200}
        }
    },
    updated: function () {
        this.draw();
    },
    created:function(){
        this.$nextTick(function(){
            this.draw();
        })
    },
    methods: {
        onBlur:function(index){
            if(this.list[index]==''){
                this.list.splice(index,1);
            }
        },
        onNewItem:function(){
            if(this.newListItem!=''){
                this.list.push(this.newListItem);
                this.newListItem="";
            }
        },
        filesChange:function(file){
            var self=this;
            var fr = new FileReader();
            fr.onload=function(){
                self.fileSrc=this.result;
                self.draw();
            }
            fr.readAsDataURL(file[0]); 
        },
        draw: function () {
            var ctx=this.$el.querySelector("#canvas").getContext("2d");
            var self = this;
            ctx.fillStyle = "rgb("+this.color.bak.r+","+this.color.bak.g+","+this.color.bak.b+")";
            ctx.fillRect(0, 0, 600, 800);

            var img = new Image();
            img.onload = function () {
                //調整圖片縮放
                let ratio = 1.0;
                let newWidth=0;
                let newHeight=0;
                if (img.height <= img.width) {//橫式圖片
                    ratio = 1.0 * (img.height / img.width);
                    newWidth=400;
                    newHeight=newWidth * ratio;
                    //避免圖片過高
                    if(newHeight>=300){
                        newHeight=300;
                        newWidth=newHeight/ratio;
                    }
                } else {//直式圖片
                    ratio = 1.0 * (img.width / img.height);
                    newHeight=300;
                    newWidth=newHeight * ratio;
                }

                ctx.drawImage(img, (600-newWidth)/2, PADDING_IMAGE, newWidth,newHeight );
                nextY = PADDING_IMAGE + newHeight + PADDING_IMAGE;
                self.drawText(ctx);
            }
            if(this.fileSrc==null){
                img.src = "./resource/Doge.jpeg"
            }else{
                img.src=this.fileSrc;
            }
        },
        drawText: function (ctx) {
            //Title
            ctx.fillStyle = "rgb("+this.color.title.r+","+this.color.title.g+","+this.color.title.b+")";
            ctx.font = '48px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(this.title, 300, nextY + 50);
            nextY += 100;
            this.drawList(ctx);
        },
        drawList: function (ctx) {
            ctx.fillStyle = "rgb("+this.color.list.r+","+this.color.list.g+","+this.color.list.b+")";
            ctx.font = '22px sans-serif';
            ctx.textAlign = 'left';

            for(i=0;i<this.list.length;i++){
                ctx.fillText("● " + this.list[i], this.paddLeftOfList , nextY + 16);
                nextY += 32;
            }
        }
    }
})