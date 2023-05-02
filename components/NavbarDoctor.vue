<template>
    <div class="container-fuild bg-success mb-3">
        <div class="container py-2">
            <div class="row align-items-center justify-content-between  mb-2">
                <div class="col-md-7 col-lg-8 mt-3">
                    <!-- <img src="../assets/24px.png" alt="" class="img me-3 pb-2"> -->
                    <router-link to="/" class="text-decoration-none">
                        <span class="text animate__animated animate__bounce animate__flash">DoctOnline</span>
                    </router-link>
                </div>

                <div class="d-none d-md-block col-md-5 col-lg-4 mt-3">
                    <div class="row">
                        <!-- <div class="col-2">
                            <span class="me-2 call-line fw-bold ">Əsas </span>
                        </div>
                        <div class="col-2">
                            <span class="me-2 call-line fw-bold ">Bloq</span>
                        </div> -->
                        <div class="col-8">
                            <span class="me-2 call-line fw-bold ">Dəstək xətti:</span>
                            <a href="tel:(050) 831-31-16" class="call text-decoration-none">+994 (50) 831 31 16</a>
                        </div>
                    </div>
                </div>
                <!-- <div class="d-md-none col-4">
                <button class="btn btn-success col-sm-4" style="font-size: 14px;">Randevu al</button>
            </div> -->
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Navbar-Doctor',
};
</script>

<style lang="scss" scoped>
.bg-success {
    background: rgba(31, 193, 23, 0.63) !important;

}

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
