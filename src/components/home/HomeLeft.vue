<template>
    <div class="container">
        <div class="shadow-box">
            <div style="margin: 12px 12px 12px 12px;line-height: 50px;">
                <div class="font">
                    logo 三连获取学习币
                </div>
                <div class="black-line"></div>
                <div class="font">
                    logo B站原创UP主
                </div>
                <div class="black-line"></div>
                <div class="font">
                    logo 微信公众平台
                </div>
            </div>
        </div>
    </div>
</template>
   
<style scoped>
.container {
    position: relative;
}


.shadow-box {
    position: absolute;
    top: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
}

.shadow-box::after,
.shadow-box::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    z-index: -1;
    background: #fff;
    border-radius: 10px;
}

.shadow-box::after {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
}

.black-line {
    border-top: 0.5px solid rgb(223, 220, 220);
    width: 100%;
}

.font {
    font-size: 16px;
}
</style>