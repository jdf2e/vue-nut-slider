
<template>
    <div id="vueslider">
        <h1>vue-nut-slider 轮播组件</h1>
        <h4>横向无缝切换</h4>
        <nut-slider
            :paginationVisibile="true"
            direction="horizontal"
            ref="demo1"
            
        >
           <div  v-for="(item,index) in dataImgItem" :key="index"  class="nut-slider-slide ">
                <img :src="item.imgSrc"   style="max-width:100%;"/> 
            </div>

        </nut-slider>

        <h4>横向切换</h4>
        <nut-slider
            :paginationVisibile="true"
            direction="horizontal"
            ref="demo2"
            :canDragging="false"
            :paginationVisible="true"
            
        >
             <div  v-for="(item,index) in dataImgItem" :key="index"  class="nut-slider-slide ">
                <img :src="item.imgSrc"   style="max-width:100%;" /> 
            </div>

        </nut-slider>

         <h4>横向循环切换</h4>
         <nut-slider
            :paginationVisibile="true"
            direction="horizontal"
            ref="demo3"
            :loop="true"
            :canDragging="false"
            :paginationVisible="true"
            
        >
             <div  v-for="(item,index) in dataImgItem" :key="index"  class="nut-slider-slide ">
                <img :src="item.imgSrc"   style="max-width:100%;" /> 
            </div>


        </nut-slider>

         <h4>纵向自动播放</h4>
          <nut-slider
            direction="vertical"
            ref="demo4"
            :autoPlay="3000"
        >
             <div  v-for="(item,index) in dataImgItem" :key="index"  class="nut-slider-slide ">
                <img :src="item.imgSrc"   style="max-width:100%;" /> 
            </div>
        </nut-slider>

        <h4>滑动懒加载图片</h4>
        <nut-slider
            direction="horizontal"
            ref="demo5"
            :lazyLoad="true"
             :paginationVisible="true"
        >
             <div  v-for="(item,index) in dataImgItem" :key="index"  class="nut-slider-slide ">
                <img :data-src="item.imgSrc"  style="max-width:100%;" class="nut-img-lazyload"/> 
            </div>

        </nut-slider>

        
  
    </div>

</template>
<script>
    import './asset/css/common.scss'
    import nutSlider from './view/vue-nut-slider.vue'

    export default{
        data(){
            return{
                dataItem:null,
                dataImgItem:[],
            }
        },
        components:{
            'nut-slider':nutSlider
        },
        mounted(){
            setTimeout(()=>{
                this.dataItem = [{
                    name:1
                },{
                    name:2
                },{
                    name:3
                },{
                    name:4
                }]
                this.dataImgItem = [
                    {
                        imgSrc:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg'
                    },
                    {
                        imgSrc:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png'
                    },
                    {
                        imgSrc:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg'
                    },
                    {
                        imgSrc:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg'
                    }
                ];
                
                this.$refs.demo1.updateEvent(1);
                this.$refs.demo2.updateEvent();
                this.$refs.demo3.updateEvent();
                this.$refs.demo5.updateEvent();
                this.$refs.demo4.updateEvent();
            },300)
        }
    }
</script>
<style lang="scss">
    #vueslider{
        h1{
            color:#848689;
            font-size:0.32rem;
            padding:0.5rem 0.2rem 0.2rem;
            text-align: center;
        }
        h4{
            color:#333;
            font-size:0.28rem;
            padding:0.4rem 0.2rem 0.2rem;
        }
        .nut-slider-slide{
           
            font-size:24px;
            justify-content: center;
            align-items: center;
            display: flex;
        }
       
    }
    
</style>
