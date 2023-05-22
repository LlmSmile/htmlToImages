<style scoped lang="scss">
@import "@/assets/style/llm.scss";
    .option {
        padding-bottom: 20px;
    }
    .option div {
        padding: 10px;
        border-bottom: 2px #42b983 solid;
    }
    .option div label {
        margin-right: 20px;
    }

    .box{
        @include wh(720px, auto, r);
        overflow: hidden;
        float: left;
        .home{
           @include wh(100%, auto, r);
        }
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
                    @include wh(100%, auto, r);
                    z-index: 99;
                    .cimg{
                        @include wh(428px, 428px, r);
                        @include radius(20px);
                        margin: 0 auto;
                        img{width: 100%;float: inherit;}
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

    .box2{
        @include wh(320px, auto, r);
        overflow: hidden;
        float: left;
        img{width: 100%;}
    }
</style>
<template>
        <el-container>
            <el-row>
                <el-col :span="12">
                    <el-header>
                        <upload-excel-component :on-success="handleSuccess"/>
                        <!-- <el-button type="primary" @change="fnChange($event)">点击上传</el-button> -->
                        <el-progress :percentage="percentage" v-if="list.length>0"></el-progress>
                        <el-button type="primary" @click="addimg" v-if="list.length>0">生成图片</el-button>
                        <el-button type="primary" @click="getPdf" v-if="showPdf">导出pdf</el-button>
                    </el-header>
                </el-col>
                <!-- <el-col :span="12">
                    <el-button type="primary" @click="addimg" v-if="list.length>0">生成图片</el-button>
                    <el-button type="primary" @click="getPdf" v-if="showPdf">导出pdf</el-button>
                </el-col> -->
            </el-row>
            

            <el-main>
                <div class="box2" v-if="imgList.length > 0">
                    <div class="list" v-for="(item,index) of imgList" :key="index">
                        <img :src="item">
                    </div>
                </div>

                <div class="box" ref="content" style="opacity:0;" v-if="list.length>0">
                    <div class="list" :id="'menuItem1'">
                        <img class="bg" src="@/assets/mobile/bg.png">
                        <div class="content">
                            <div class="t-box">
                                <div class="t">{{list[listIndex].name | lineBreak}}</div>
                            </div>
                            <div class="c-box">
                                <div class="cimg">
                                    <img :src="require(`@/assets/product/${list[listIndex].img}.png`)"></div>
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
            </el-main>
        </el-container>
        <!-- <div class="option">
            <div>
                <label>1.先文档，出现生成图片按钮，等待片刻，出现导出按钮即可生成文件</label>
                <input type="file" accept=".xlsx, .xls" />
            </div>
        </div> -->


        

        

    
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import * as XLSX from 'xlsx'
import html2canvas from "html2canvas"
import {jsPDF} from 'jspdf';
import { Loading } from 'element-ui';
import { convertKey } from '@/utils/tool';

export default {
    name: "FaceLandmarkDetection",
    data() {
        return {
            percentage: 0, // 进度条
            list: [],
            listIndex: 0,
            imgList: [],
            showPdf: false,
            tableData: [],
            tableHeader: []
        };
    },
    components: { UploadExcelComponent },
    filters:{
        lineBreak:function(data){
            return data.replace(/<br>/g,'\n');
        }
    },
    methods: {
        handleSuccess({ results, header }) {
            this.tableData = results
            this.tableHeader = header
            this.list = convertKey(results, ['id', 'logo', 'name', 'ang','img','type','msg','hard','soft','content','price',])
            console.log(123, results, header)
        },
        // 读表
        analysis(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const data = e.target.result;
                    let datajson = XLSX.read(data, {
                        type: "binary",
                        cellDates: true
                    });
                    const result = [];
                    datajson.SheetNames.forEach(sheetName => {
                        result.push({
                            sheetName: sheetName,
                            sheet: XLSX.utils.sheet_to_json(datajson.Sheets[sheetName])
                        });
                    });
                    resolve(result);
                };
                reader.readAsBinaryString(file);
            });
        },
        // 读取表格遍历名称
        fnChange(e){
            const itemFile = e.target.files[0]
            this.analysis(itemFile).then(data => {
                console.log(111, data[0].sheet)
                this.list = convertKey(data[0].sheet, ['id', 'logo', 'name', 'ang','img','type','msg','hard','soft','content','price',])
            })
        },
        addimg(){
            console.log(1213,)
            // this.imgList.push(require('@/assets/mobile/home.png'))
            
            this.timer = setInterval(()=>{
                this.htmlToCanvas();
                this.percentage = this.imgList.length / (this.list.length - 1 ) * 100;
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
        toImg(index){
            let that = this;
            return new Promise(function (resolve, reject) {
                const ref = document.getElementById(`menuItem1`)
                html2canvas(ref, {
                    dpi: 500,
                    allowTaint: true,
                    useCORS: true,
                    scrollY: 0,
                    scrollX: 0,
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
        async getPdf() {
            this.$notify({
            title: '提示',
            message: '这是一条不会自动关闭的消息',
            duration: 0
            });
            const { maxWidth, maxHeight } = await this.getMaxWidthHeight();
            const recordPdf = new jsPDF('p', 'px', [maxWidth, maxHeight])
            recordPdf.addImage(require('@/assets/mobile/home.png'), 'png', 0, 0, 720, 2405);
            recordPdf.addPage();
            for (let i = 0; i < this.imgList.length; i++) {
                const { width, height } = await this.getImgWidthHeight(this.imgList[i])
                console.log(12343333, width, height)
                recordPdf.addImage(this.imgList[i], 'png', 0, 0, width, height)
                recordPdf.addPage()
            }
            const targetPage = recordPdf.internal.getNumberOfPages()
            recordPdf.deletePage(targetPage)
            recordPdf.save('PDF存档.pdf')
        },
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
        
    },
};
</script>


