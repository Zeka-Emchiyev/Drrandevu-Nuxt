<template>
    <div>
        <!-- Footer -->
        <footer class=" text-lg-start text-muted pt-3">
            <!-- Section: Links  -->
            <div class="container-fluid text-center-lg text-md-start mt-5 text-white">
                <!-- Grid row -->
                <div class="row mt-3">
                    <!-- Grid column  col-lg-4 col-xl-3 -->
                    <div class="col-md-1  mx-auto mb-4">
                        <div>
                            <img src="../assets/Logo 1.png" alt="">
                        </div>
                    </div>

                    <!-- Grid column -->
                    <div class="d-none col-6 d-lg-block  mb-4">
                        <!-- Links -->
                        <h6 class="text-contact fw-bold mb-4">
                            Əsas ixtisaslar
                        </h6>
                        <div class="row overflow-hidden" style="max-height:419px ;">
                            <div class="col-md-4" v-for="profession in professions">
                                <!-- <p @click="submit()" class="professions-text">{{ profession.name }}</p> -->
                                <div class="professions-text" @click="getDoctorsForProfession(profession.id)">
                                    {{ profession.name }}
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3">
                        <!-- Links -->
                        <h6 class="text-contact">
                            Əlaqə
                        </h6>
                        <div style="margin-bottom: 12px;">
                            <a href="tel:(050)-831-31-16" class="link text-decoration-none">+994
                                (50) 831 31 16</a>
                        </div>
                        <p class="link">Xan Şuşinski küç 21</p>
                    </div>
                    <div class="col-3 d-md-none mb-5 d-flex">
                        <a class="me-4" href="https://www.facebook.com/"><img src="../assets/fb.png" alt=""></a>
                        <a class="me-4" href="https://www.instagram.com/"><img src="../assets/instagram.png" alt=""></a>
                    </div>
                </div>
                <!-- Grid row -->
            </div>
            <!-- Section: Links  -->

            <!-- Copyright -->
            <div class="container-fluid footer foot-bg">
                <div class="row justify-content-between p-3">
                    <div class="col-3 ms-5 d-none d-md-block">
                        <a class="me-5" href="https://www.facebook.com/"><img src="../assets/fb.png" alt=""></a>
                        <a class="me-5" href="https://www.instagram.com/"><img src="../assets/instagram.png" alt=""></a>
                    </div>
                    <div class="col-12 col-md-3">
                        <p class="text-footer">© 2023 Doctonline - Bütün hüquqlar qorunur.</p>
                    </div>
                </div>
            </div>


            <!-- Copyright -->
        </footer>
        <!-- Footer -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Footer',

    data() {
        return {
            professions: '',
            doctors: '',
            selectedClinic: '',
            selectedRegion: '',

        };
    },

    mounted() {
        this.professionsApi()

    },

    methods: {

        professionsApi() {
            axios.get(this.$apiUrl + "/api-professions")
                .then(response => {
                    this.professions = response.data
                    // console.log(profession)

                    // console.log(this.professions)


                })
                .catch(e => console.log(e))
        },

        getDoctorsForProfession(professionId) {
            this.$router.push({ path: '/search', query: { 'prof-id': professionId, 'region-id': this.selectedRegion, 'clinic-id': this.selectedClinic } })
            window.location.reload()
        },



    },
};
</script>

<style lang="scss" scoped>
.professions-text {
    color: #E1E1E1;
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #4CB147;
    }
}

footer {
    background-color: #444444;
}

.link {
    text-decoration: none;
    color: white;
    font-size: 14px;
    line-height: 20px;
}

.text-contact {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 16px;
}

.text-footer {
    font-size: 16px;
    line-height: 24px;
    color: white;
}

.foot-bg {
    background-color: #4c4b4b;
}
</style>
