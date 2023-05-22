<style scoped lang="scss">
@import "@/assets/style/llm.scss";
    .h5-box{
        @include wh(720px, auto, a);
        top: -100%; left: -100%;
        overflow: hidden;
        float: left;
        .list{
            @include wh(100%, 100%, r);
            overflow: hidden;
            .bg{
                @include wh(100%, 100%, a);
                left: 0; top: 0;
            }
            .content{
                @include wh(100%, auto, r);
                left: 0; top: 0;
                .t-box{
                    @include wh(100%, 400px, r);
                    .t{
                        position: absolute;
                        width: 50%;
                        @include txt(44px, auto, center, 500);
                        @include color('', #fff);
                        @include jz(lt, 50%, 70%);
                    }
                    
                }
                .c-box{
                    @include wh(100%, 428px, r);
                    z-index: 99;
                    .c{
                        @include wh(428px, 428px, a);
                        @include radius(20px);
                        @include jz(lt, 50%, 50%);
                    }
                }
                .bg3-box{
                    @include wh(100%, 270px, a);
                    top: 620px;
                    .bg3{
                        @include wh(100%, 270px, a);
                        @include jz(lt, 50%, 50%);
                    }
                }
                .t2-box{
                    @include wh(100%, 132px, r);
                    top: 100px;
                    img{
                        @include wh(271px, 132px, a);
                        @include jz(lt, 50%, 50%);
                    }
                }
                .bg4-box{
                    @include wh(100%, auto, r);
                    @include padding(1, 40px 30px);
                    margin-top: 100px;
                    margin-bottom: 40px;;
                    .bg4{
                        @include wh(100%, 100%, a);
                        @include jz(lt, 50%, 50%);
                    }
                    .txt-box{
                        @include wh(100%, auto, r);
                        top: 0; left: 0;
                        overflow: hidden;
                        @include padding(1, 20px 0);
                        .con{
                           @include wh(80%, auto, r);
                           overflow: hidden;
                           margin: 0 auto;
                           .t-list{
                                @include wh(100%, auto, r);
                                border-bottom: #a7afb9 1px dashed;
                                @include padding(1, 50px 0);
                                display: table;
                                
                                .left{
                                    width: 36%;
                                    @include txt(28px, '', left, 550);
                                    align-items: center;
                                    @include color('', #f1d4c8);
                                    display: table-cell;
                                    vertical-align: middle;

                                }
                                .right{
                                    width: 65%;
                                    @include txt(24px, '', left, 500);
                                    @include color('', #fff);
                                    white-space: pre-wrap;
                                    display: table-cell;
                                    vertical-align: middle;
                                }
                                .x{
                                    @include wh(554px, 1, r);
                                    margin: 0 auto
                                }
                            }
                            .t-list:last-child{
                               border: none 
                            }
                            .jj{@include padding(1, 100px 0);}
                        }
                    }
                }
            }
        }
    }
    .pc-box{
        @include wh(1920px, 1080px, a);
        top: -100%; left: -100%;
        overflow: hidden;
        float: left;
        .list{
            @include wh(100%, 100%, r);
            overflow: hidden;
            .bg{
                @include wh(1920px, 1080px, a);
                left: 0; top: 0;
            }
            .content{
                @include wh(1920px, 1080px, r);
                left: 0; top: 0;
                .t-box{
                    @include wh(428px, 400px, a);
                    z-index: 99;
                    left: 72px; top: 510px;
                    .t{
                        position: absolute;
                        width: 90%;
                        @include txt(30px, auto, center, 500);
                        @include color('', #fff);
                        @include jz(lt, 50%, 70%);
                    }
                }
                .c-box{
                    @include wh(428px, 428px, a);
                    z-index: 99;
                    left: 72px; top: 320px;
                    .c{width: 100%;float: inherit;}
                }
                .bg4-box{
                    @include wh(1304px, 864px, a);
                    top: 215px; left: 566px;
                    .right{
                        @include wh(50%, 262px, r);
                        @include padding(1, 0px 100px 0px 200px);
                        float: left;
                        display: table;
                        p{
                             @include wh(100%, 100%, r);
                            display: table-cell; vertical-align: middle; white-space: pre-wrap;
                            @include txt(22px, '', left, 500);
                            @include color('', #fff);
                        }
                    }
                }
            }
        }
    }

    .box2{
        @include wh(100%, auto, r);
        float: left;
        .list{
            width: 80px;float: left;
            .img{width: 100%;}
            .img:hover { transform: scale(1.1);}
        }
        
    }
</style>
<template>
    <el-container>
        <el-aside width="50%">
            <el-divider></el-divider>
            <upload-excel-component :on-success="handleSuccess"/>
            <el-divider></el-divider>
            <el-steps :active="stepindex" finish-status="success">
                <el-step title="上传表格"></el-step>
                <el-step title="生成图片"></el-step>
                <el-step title="准备就绪"></el-step>
            </el-steps>
            <el-divider></el-divider>
            
            <el-progress :percentage="percentage" :text-inside="true" :stroke-width="26"></el-progress>
            <el-divider></el-divider>
            <div v-if="list.length>0 && percentage === 0">
                <el-switch v-model="lSwitch" active-text="手机版" inactive-text="电脑版" style="margin-right: 30px"></el-switch>
                <el-button type="primary" @click="addimg">生成图片</el-button>
            </div>
            
            <el-button type="primary" @click="getPdf" v-if="percentage === 100">导出pdf</el-button>
            <el-divider></el-divider>

            <el-table :data="list" border highlight-current-row style="width: 100%;margin-top:20px;" v-if="list.length > 0">
                <!-- <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" /> -->
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column prop="msg" label="描述" ></el-table-column>
                <el-table-column prop="hard" label="硬件" ></el-table-column>
                <el-table-column prop="soft" label="软件" ></el-table-column>
                <el-table-column prop="content" label="内容" ></el-table-column>
                <el-table-column prop="price" label="单价" ></el-table-column>
                <el-table-column prop="img" label="产品图" >
                    <template slot-scope="scope">
                        <el-upload
                            list-type="picture"
                            action=''
                            accept=".jpg, .png"
                            :limit="1"
                            :auto-upload="false"
                            :file-list="fileList"
                            :on-change="getFile"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleUploadRemove"
                            >
                            <el-button size="small" type="primary" @click="tableIndex(scope)">选择图片上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件</div>
                    </el-upload>
                    </template>
                </el-table-column>
            </el-table>
        </el-aside>

        
        <el-main>
            <div class="box2" v-if="imgList.length > 0">
                <div class="list" v-for="(item,index) of imgList" :key="index" @click="showImg(item)">
                    <div style="width:100%; text-align: center;">{{index + 1}}</div>
                    <el-image
                        style="width: 100%;" :src="item" cover :preview-src-list="bigImgUrl">
                    </el-image>
                </div>
            </div>

            <div class="h5-box" ref="content" style="opacity:0;" v-if="list.length>0 && lSwitch">
                <div class="list" :id="'menuItem1'">
                    <img class="bg" src="@/assets/mobile/bg.png">
                    <div class="content">
                        <div class="t-box">
                            <div class="t">{{list[listIndex].name | lineBreak}}</div>
                        </div>
                        <div class="c-box" v-if="list[listIndex].img.length>10">
                            <img class="c" :src="list[listIndex].img" >
                        </div>
                        <div class="bg3-box">
                            <img class="bg3" src="@/assets/mobile/bg3.png">
                        </div>
                        <div class="t2-box">
                            <img src="@/assets/mobile/txt2.png">
                        </div>
                        <div class="bg4-box">
                            <img class="bg4" src="@/assets/mobile/bg4.png">
                            
                            <div class="txt-box">
                                <div class="con">
                                    <div class="t-list">
                                        <div class="left">• 产品名称</div>
                                        <div class="right">{{list[listIndex].name | lineBreak}}</div>
                                    </div>
                                    <div class="t-list jj">
                                        <div class="left">• 产品简介</div>
                                        <div class="right">{{list[listIndex].msg | lineBreak}}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 硬件</div>
                                        <div class="right">{{list[listIndex].hard | lineBreak}}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 软件</div>
                                        <div class="right">{{list[listIndex].soft | lineBreak}}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 内容</div>
                                        <div class="right">{{list[listIndex].content | lineBreak}}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 单价</div>
                                        <div class="right">{{list[listIndex].price}}</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="zw"></div>
                    </div>
                </div>
            </div>
            <div class="pc-box" ref="content" style="opacity:0;" v-if="list.length>0 && !lSwitch">
                <div class="list" :id="'menuItem1'">
                    <img class="bg" src="@/assets/pc/bg.jpg">
                    <div class="content">
                        <div class="t-box">
                            <div class="t">{{list[listIndex].name | lineBreak}}</div>
                        </div>
                        <div class="c-box" v-if="list[listIndex].img.length>10">
                            <img class="c" :src="list[listIndex].img" >
                        </div>
                        <div class="bg4-box">
                            <div class="right"><p>{{list[listIndex].name | lineBreak}}</p></div>
                            <div class="right"><p>{{list[listIndex].msg | lineBreak}}</p></div>
                            <div class="right"><p>{{list[listIndex].hard | lineBreak}}</p></div>
                            <div class="right"><p>{{list[listIndex].soft | lineBreak}}</p></div>
                            <div class="right"><p>{{list[listIndex].content | lineBreak}}</p></div>
                            <div class="right"><p>{{list[listIndex].price}}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>

    </el-container>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import html2canvas from "html2canvas"
import {jsPDF} from 'jspdf';
import { Loading } from 'element-ui';
import { convertKey } from '@/utils/tool';
import { fetchList } from '@/api/article'

export default {
    name: "FaceLandmarkDetection",
    data() {
        return {
            stepindex: 0, // 步骤条
            percentage: 0, // 进度条
            lSwitch: false,
            list: [],
            listIndex: 0,
            imgList: [],
            showPdf: false,
            tableData: [],
            tableHeader: [],
            bigImgUrl: [],
            fileList:[],
            tIndex: 0
        };
    },
    components: { UploadExcelComponent },
    filters:{
        lineBreak:function(data){
            return data.replace(/<br>/g,'\n');
        }
    },
    methods: {
        handleClick(index) {
            console.log(123, index)
        },
        // 读取表格
        handleSuccess({ results, header }) {
            // fetchList({name: 1}).then(res => {
            //     this.list1 = res.data.items.splice(0, 5)
            //     this.list2 = res.data.items
            // })
            this.timer = null;
            clearInterval(this.timer);
            this.listIndex = 0;
            this.percentage = 0;
            this.stepindex = 1;
            this.imgList = [];
            this.tableData = results;
            this.tableHeader = header;
            this.list = convertKey(results, ['id', 'logo', 'name', 'ang','img','type','msg','hard','soft','content','price',]);
            console.log(123, results, header);
            return
        },
        addimg(){
            this.stepindex = 2;
            this.timer = setInterval(()=>{
                this.htmlToCanvas();
                this.percentage = Math.trunc(this.imgList.length / (this.list.length - 1 ) * 100);
                if (this.percentage === 100) {this.stepindex = 3; this.showPdf = true; clearInterval(this.timer);}
            }, 1500)
        },
        async htmlToCanvas() {
            let that = this;
            if (this.listIndex >= this.list.length-1) {
                clearInterval(this.timer);
                this.showPdf = true;
                return
            } else {
                that.toImg(that.listIndex).then(res => {
                    that.imgList.push(res);
                    that.listIndex++;
                }).catch((e) => {console.log('转换图片报错', e)})
            }

        },
        // html转图片
        toImg(index){
            let that = this;
            return new Promise(function (resolve, reject) {
                const ref = document.getElementById(`menuItem1`)
                html2canvas(ref, {
                    dpi: 500,
                    useCORS: true,
                    scrollY: 0,
                    scrollX: 0,
                    background: '#000',
                    scale: 1
                }).then((canvas) => {
                    var context = canvas.getContext('2d');
                    context.crossOrigin = "anonymous";
                    context.textAlign = "center";
                    context.mozImageSmoothingEnabled = false;
                    context.webkitImageSmoothingEnabled = false;
                    context.msImageSmoothingEnabled = false;
                    context.imageSmoothingEnabled = false;
                    var src64 = canvas.toDataURL("image/png");
                    resolve(src64)
                }).catch((e) => {console.log(e);})
            })
        },
        // 导出pdf
        async getPdf() {
            const { maxWidth, maxHeight } = await this.getMaxWidthHeight();
            let recordPdf;
            if (this.lSwitch) {
                recordPdf = new jsPDF('p', 'px', [maxWidth, maxHeight])
                recordPdf.addImage(require('@/assets/mobile/home.png'), 'jpeg', 0, 0, 720, 2405);
            } else {
                recordPdf = new jsPDF('l', 'px', [maxWidth / 2, maxHeight / 2])
                recordPdf.addImage(require('@/assets/pc/home.jpg'), 'jpeg', 0, 0, 1920 / 2, 1080 / 2);
            }
            recordPdf.addPage();
            for (let i = 0; i < this.imgList.length; i++) {
                const { width, height } = await this.getImgWidthHeight(this.imgList[i])
                console.log(12343333, width, height)
                if (this.lSwitch) {
                    recordPdf.addImage(this.imgList[i], 'jpeg', 0, 0, width, height)
                } else {
                    recordPdf.addImage(this.imgList[i], 'jpeg', 0, 0, width / 2, height / 2)
                }
                
                recordPdf.addPage()
            }
            const targetPage = recordPdf.internal.getNumberOfPages()
            recordPdf.deletePage(targetPage)
            recordPdf.save(this.lSwitch ? '手机.pdf' : '电脑.pdf')
        },
        // 获取所有图片最大的宽高
        async getMaxWidthHeight(){
            console.log(111)
            const widthList = []
            const heightList = []
            let maxHeight = 0
            let maxWidth = 0
            for (let i = 0; i < this.imgList.length; i++) {
                const { width, height } = await this.getImgWidthHeight(this.imgList[i]);
                console.log(222, width, height)
                widthList.push(width)
                heightList.push(height)
            }
            console.log(1233333, widthList, heightList)
            // 把数组变成升序然后倒过来取第一个就是拿最大宽度
            maxWidth = widthList.sort().reverse()[0]
            maxHeight = heightList.sort().reverse()[0]
            return {
                maxWidth,
                maxHeight,
            }
        },
        //获取图片宽高
        getImgWidthHeight(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = src
                // 图片是否有缓存 如果有缓存可以直接拿 如果没有缓存 需要从onload拿
                if (img.complete) {
                    const { width, height } = img
                    resolve({
                        width,
                        height,
                    })
                } else {
                    img.onload = function () {
                        const { width, height } = img
                        resolve({
                            width,
                            height,
                        })
                    }
                }
            })
        },
        showImg(url) {
            this.bigImgUrl = [];
            this.bigImgUrl.push(url)
        },
        getFile(file, fileList) {
            this.getBase64(file.raw).then(res => {
                const params = res
                this.proofImage = params
                this.list[this.tIndex].img = params;
                console.log(111, this.list)
            })
            
        },
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                let imgResult = ''
                reader.readAsDataURL(file)
                reader.onload = function () {
                imgResult = reader.result
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.onloadend = function () {
                    resolve(imgResult)
                }
            })
        },
        handleUploadRemove(file, fileList) {
            this.proofImage = ''
            this.ruleForm.message_img = ''
        },
        handlePictureCardPreview(file) {
            console.log(this.proofImage)
        },
        tableIndex(index) {
            console.log(index.$index)
            this.tIndex = index.$index
        }
        
    },
};
</script>


