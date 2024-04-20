<template>
    <div class="container">
        <div class="row align-items-center justify-content-between    mb-2">

            <div class="col-md-7 col-lg-8 mt-3">
<!--                 <img src="../assets/24px.png" alt="" class="img me-3 pb-2">-->
                 <nuxt-link to="/" class="text-decoration-none">
                    <span class="text animate__animated animate__bounce animate__flash">Dr</span>
                    <span class="text-online animate__animated animate__bounce animate__flash">Randevu</span>
                </nuxt-link>
            </div>

            <div class="d-none d-md-block col-md-5 col-lg-4 mt-3">
                <span class="me-2 call-line fw-bold ">Dəstək xətti:</span>
                <a href="tel:(050) 831-31-16" class="call text-decoration-none">+994 (50) 831 31 16</a>
            </div>
            <!-- <div class="d-md-none col-4">
                <button class="btn btn-success col-sm-4" style="font-size: 14px;">Randevu al</button>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>
.call {
    font-size: 16px;
    line-height: 24px;
    color: #273142;
    font-weight: 400;

}

.call-line {
    font-size: 16px;
    line-height: 24px;

}

.text {
    font-size: 28px;
    color: black;
}

.text-online {
    font-size: 28px;
    color: #4CB147;
}
</style>
