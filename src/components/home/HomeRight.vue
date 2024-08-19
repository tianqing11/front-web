<template>
        <div class="shadow-box">
            <div style="line-height: 50px;">
                <div style="text-align: center;">
                    <span class="font">微信联系我</span>
                </div>
                <div>
                    <img src="../../assets/logo1.png" style="padding: 2px;height: 120px;margin-left: 10px;">
                </div>
            </div>
        </div>
</template>
   
<style scoped>


.shadow-box {
    position: absolute;
    left: 85%;
    background-color: #e9e5bd;
    border-radius: 10px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
    width: 145px;
    height: 180px;
    top: 600px;
    border: 10px solid #9e9d5e;
}

.shadow-box::after,
.shadow-box::before {
    content: '';
    position: absolute;
    z-index: -1;
    background: #fff;
    border-radius: 10px;
}

.shadow-box::after {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2);
}

.black-line {
    border-top: 0.5px solid rgb(223, 220, 220);
    width: 100%;
}

.font {
    font-size: 13px;
    background: #f80;
    text-align: center;
    padding: 5px;
    border-radius: 20px 20px 20px 20px
    
}
</style>