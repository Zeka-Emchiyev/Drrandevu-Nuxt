<template>
    <div class="container-fluid">
<!--        <Navbar></Navbar>-->
        <div class="container mt-3">
            <div class="row my-4">

                <div class="d-none d-md-block col-md-9">
                    <h1 class="animate__animated animate__bounce animate__zoomInDown">
                        Digər axtarışı edin
                    </h1>
                    <div class="input-group justify-content-between">
                        <div class="input-holder dropdown">
                            <i class="bi bi-search icon-search"></i>
                            <input v-model="searchProfession" class="icon dropdown-toggle form-control border-0 input-all"
                                type="text" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                aria-label="First name" placeholder="İxtisaslar">

                            <div class="dropdown-menu form-control  border overflow-auto"
                                aria-labelledby="dropdownMenuButton1" style="max-height:360px; min-width:280px">
                                <p class="dropdown-item text-position">İxtisaslar</p>

                                <div class="flex-row flex-wrap ">
                                    <div @click="selected(profession)" class="dropdown-item link"
                                        v-for="profession in filterProfessions">
                                        {{ profession.name }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="input-holder dropdown">
                            <span class="span-line"></span>
                            <i class="bi bi-geo-alt-fill icon-location ms-2"></i>
                            <input v-model="searchRegion" class="icon dropdown-toggle form-control border-0 input-location"
                                type="text" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"
                                aria-label="First name" placeholder="Rayonlar">

                            <div class="dropdown-menu form-control  border overflow-auto"
                                aria-labelledby="dropdownMenuButton2" style="max-height:360px; min-width:280px">
                                <p class="dropdown-item text-position">Rayonlar</p>

                                <div class="flex-row flex-wrap">
                                    <div @click="select(region)" class="dropdown-item link" v-for="region in filterRegions">
                                        {{ region.name }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="input-holder dropdown">
                            <span class="span-line"></span>
                            <i class="bi bi-shield-check icon-insurance ms-2"></i>

                            <input v-model="searchClinic" class="icon dropdown-toggle form-control border-0 input-insurance"
                                type="text" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false"
                                aria-label="First name" placeholder="Klinikalar">

                            <div class="dropdown-menu form-control  border overflow-auto"
                                aria-labelledby="dropdownMenuButton3" style="max-height:365px; min-width:280px">
                                <p class="dropdown-item text-position">Klinikalar</p>

                                <div class="flex-row flex-wrap">
                                    <div @click="selectClinic(clinic)" class="dropdown-item link"
                                        v-for="clinic in filterClinics">
                                        {{ clinic.name }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button @click="searchProfessions()"
                            class="icon-button btn btn-success bg-success rounded-start ms-1"></button>

                    </div>
                </div>


            </div>


            <div v-for="doctor in paginatedDoctors" class="hold-doctor">
                <div class="row">
                    <div class="col-md-8">
                        <div class="row mt-4">
                            <div class="col-3 col-lg-2">
                                <div class="rounded-circle border profile-image" :style="{
                                                                        'background-image': 'url(' + `http://159.223.22.111/${doctor.profile_photo}` + ')'
                                                                    }">
                                </div>
                                <router-link class="text-decoration-none profile-link"
                                    :to="{ name: 'doctor', params: { id: doctor.id } }">
                                    Profilə bax
                                </router-link>
                            </div>
                            <div class="col-9 col-lg-10">

                                <router-link class="text-decoration-none rout-link"
                                    :to="{ name: 'doctor', params: { id: doctor.id } }">
                                    {{ doctor.fullname }}
                                </router-link>
                                <span class="text-profession" style="display: block;">{{
                                                                    doctor.profession
                                                                    }}</span>

                                <span class="city mb-1">{{ doctor.address }} </span>
                                <span class="city fw-bold">{{ doctor.clinic }}</span>
                                <i class="bi bi-shield-check icon-ins pe-1"></i>
                                <p class="insurance">Paşa siğorta</p>

                                <!-- <span class="city ">{{ doctor.experiences }}</span> -->
                                <!-- <div><i class="bi bi-star-fill star"></i>
                                    <span class="star-assess mx-1">4.86</span>
                                    <span class="text-worth">(254 dəyərləndirmə )</span>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <Calendar @dateSelected="showSelectedAppointmentModal" :doctor="doctor"></Calendar>

                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-center mt-5">
                <pagination class="search-pagination" v-model="pagination.page" :records="doctors.length"
                    :per-page="pagination.perPage" @paginate="myCallback" :options="pagination.options" />
            </div>

        </div>

        <!-- Modal -->
        <div class="modal fade" id="takeAppointmentModal" tabindex="-1" aria-labelledby="takeAppointmentModalLabel"
            aria-hidden="hidden">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="takeAppointmentModalLabel">Randevu detallari</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container d-flex align-items-center justify-content-center my-5 ">
                            <div class="row">
                                <div class="col-4">
                                    <img class="rounded-circle" style="height: 100px; width: 100px"
                                        :src="`http://159.223.22.111/${selectedDoctor.profile_photo}`" alt="">
                                </div>
                                <div class="col-8">
                                    <h6>{{ selectedDoctor.fullname }}, {{ selectedDoctor.profession }} </h6>
                                    <p> {{ moment(selectedDay).format('DD MMMM YYYY dddd') }} - {{
                                                                            selectedTime
                                                                            }}</p>
                                    <p>{{ selectedDoctor.clinic }}</p>
                                </div>

                                <div class="col-8 mt-3">
                                    <label for="">Ad, Soyad</label>
                                    <input v-model="form.fullname" class="form-control" type="text">
                                </div>
                                <div class="col-8 mt-2" width="100%">
                                    <label for="">Mobil nömrə</label>
                                    <input v-model="form.phone" class="form-control" type="text">
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-success" @click="createAppointment" data-bs-toggle="modal"
                            data-bs-target="#successModal">
                            Təsdiqlə
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal result -->
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="clinic-border text-center"> <i style="color: #4CB147; "
                                class="bi bi-check-circle-fill d-block fs-1 "></i>
                            {{ result.message }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Pagination from 'vue-pagination-2'
// import Calendar from "@/components/Calendar"
import 'moment/locale/az';
import moment from 'moment'


export default {
    name: 'ProjectsSearch',
    components: {

    },
    data() {
        return {
            selectedProfession: '',
            doctors: [],
            professions: '',
            searchProfession: '',
            searchRegion: '',
            selectedRegion: '',
            clinics: '',
            searchClinic: '',
            selectedClinic: '',
            regionsDoctors: null,
            regions: '',
            selectedDay: null,//moment().toDate().toISOString(),
            selectedTime: '',

            form: {
                date: null,
                doctor_id: null,
                email: null,
                fullname: null,
                phone: null,
                time: null,
            },
            selectedDoctor: {},
            appointmentDate: null,
            selectedDate: null,
            moment,
            result: '',
            pagination: {
                perPage: 15,
                page: 1,
                options: {
                    texts: {
                        count: '',
                        first: '',
                        last: ''
                    },
                }
            }
        };
    },
    computed: {
        filterProfessions() {
            let filtered = this.professions
            if (this.searchProfession != '') {
                filtered = this.professions.filter(profession => {
                    let professionNameLowercase = profession.name.toLowerCase()
                    let searchProfessionLowercase = this.searchProfession.toLowerCase()
                    return professionNameLowercase.includes(searchProfessionLowercase)
                })
            }
            return filtered
        },
        filterRegions() {
            let filtered = this.regions
            if (this.searchRegion != '') {
                filtered = this.regions.filter(region => {
                    let regionNameLowerCase = region.name.toLowerCase()
                    let searchRegionLowerCase = this.searchRegion.toLowerCase()
                    return regionNameLowerCase.includes(searchRegionLowerCase)
                })
            }
            return filtered
        },
        filterClinics() {
            let filtered = this.clinics
            if (this.searchClinic != '') {
                filtered = this.clinics.filter(clinic => {
                    let clinicNameLowerCase = clinic.name.toLowerCase()
                    let searchClinicLowerCase = this.searchClinic.toLowerCase()
                    return clinicNameLowerCase.includes(searchClinicLowerCase)
                })
            }
            return filtered
        },
        paginatedDoctors() {
            const startIndex = this.pagination.perPage * (this.pagination.page - 1);
            const endIndex = startIndex + this.pagination.perPage;
            return this.doctors.slice(startIndex, endIndex);
        }
    },

    mounted() {
        this.professionApi()
        this.regonsApi()
        this.clinicsApi()
        const profId = this.$route.query['prof-id'] || ''
        const regionId = this.$route.query['region-id'] || ''
        const clinicId = this.$route.query['clinic-id'] || ''
        this.getDoctorsForProfessionAndRegion(profId, regionId, clinicId)

        this.myModal = new bootstrap.Modal(document.getElementById('takeAppointmentModal'), { backdrop: 'static', keyboard: false })
        this.successModal = new bootstrap.Modal(document.getElementById('successModal'), { backdrop: 'static', keyboard: false })
        // console.log(this.$route.query)
    },

    methods: {
        myCallback(page) {
            console.log(this.pagination.page)
            window.scroll(0, 0)
        },

        professionApi() {
            this.$axios.get('http://159.223.22.111' + "/api-professions")
                .then(response => {
                    this.professions = response.data
                    // check if prof id exist. if so then set.
                    // Region and insurance selection also should be added like this way
                    if (this.$route.query['prof-id']) {
                        const selectedProfession = this.professions.find(pro => pro.id === Number(this.$route.query['prof-id']))
                        if (selectedProfession) {
                            this.selected(selectedProfession)
                        }
                    }
                    // console.log(this.professions)
                })
                .catch(e => console.log(e))
        },
        regonsApi() {
            this.$axios.get('http://159.223.22.111' + '/api-regions')
                .then(resp => {
                    this.regions = resp.data

                    if (this.$route.query['region-id']) {
                        const selectedRegion = this.regions.find(region => region.id === Number(this.$route.query['region-id']))
                        if (selectedRegion) {
                            this.select(selectedRegion)
                        }
                    }
                })
                .catch(e => console.log(e))
        },
        clinicsApi() {
            this.$axios.get('http://159.223.22.111' + '/api-clinics')
                .then(resp => {
                    this.clinics = resp.data
                    if (this.$route.query['clinic-id']) {
                        const selectedClinic = this.clinics.find(clinic => clinic.id === Number(this.$route.query['clinic-id']))
                        if (selectedClinic) {
                            this.selectClinic(selectedClinic)
                        }
                    }
                    // console.log(this.clinics)
                })
        },
        getDoctorsForProfessionAndRegion(profId, regionId, clinicId) {
            // const profId = this.$route.query['prof-id'] || ''
            // const regionId = this.$route.query['region-id'] || ''
            // const clinicId = this.$route.query['clinic-id'] || ''
            const queryLink = `http://159.223.22.111/api-doctors?prof-id=${profId}&region-id=${regionId}&clinic-id=${clinicId}`
            this.$axios.get(queryLink)
                .then(response => {
                    // this.doctors = response.data
                    if (response.data != null) {
                        this.doctors = response.data
                    }
                    console.log(this.doctors)
                })
                .catch(e => console.log(e))
        },
        selected(selected) {

            this.searchProfession = selected.name
            this.selectedProfession = selected.id
            // console.log(this.selectedProfession)
        },
        select(selected) {
            this.searchRegion = selected.name
            this.selectedRegion = selected.id
            // console.log(this.selectedRegion)
        },
        selectClinic(selected) {
            this.searchClinic = selected.name
            this.selectedClinic = selected.id
            // console.log(this.selectedClinic)
        },

        searchProfessions() {
            this.getDoctorsForProfessionAndRegion(this.selectedProfession, this.selectedRegion, this.selectedClinic)
            this.$router.push({ path: '/search', query: { 'prof-id': this.selectedProfession, 'region-id': this.selectedRegion, 'clinic-id': this.selectedClinic } })
        },
        setDay() {
            console.log('day')
        },
        setTime() {
            console.log('time')
        },
        showSelectedAppointmentModal(data) {
            this.selectedDoctor = data.doctor
            this.selectedDate = data.time
            this.selectedDay = data.date
            this.myModal.show()
            // console.log(data)
        },
        createAppointment() {
            this.form.doctor_id = this.selectedDoctor.id
            this.form.date = moment(this.selectedDay).format('YYYY-MM-DD HH:mm')
            this.form.time = this.selectedTime
            if (this.form.fullname !== '' && this.form.phone !== '') {
                $axios.post('http://159.223.22.111' + "/api-appointments/create", this.form)
                    .then((resp) => {
                        // console.log(resp)
                        this.result = resp.data
                        this.myModal.hide()
                        this.successModal.show()
                    })
                    .catch(e => console.log(e))
            }
            this.form.fullname = ''
            this.form.phone = ''

        },

    },
};
</script>

<style lang="scss" scoped>
.search-pagination ::v-deep {

    li.VuePagination__pagination-item-prev-chunk,
    .VuePagination__pagination-item-next-chunk {
        display: none !important;
    }

    .page-link.active {
        background-color: #4CB147;
    }

    li.VuePagination__pagination-item-prev-page a {
        visibility: hidden;
    }

    li.VuePagination__pagination-item-prev-page {
        background-image: url(../assets/icons/icon-back.svg);
        background-repeat: no-repeat;
        background-size: 15px;
        background-position: center;
        border: 1px solid #dee2e6;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        height: 37.5px;
        cursor: pointer;

        &:hover {
            color: #4CB147 !important;
        }
    }

    li.VuePagination__pagination-item-next-page a {
        visibility: hidden;
    }

    li.VuePagination__pagination-item-next-page {
        background-image: url(../assets/icons/next-icon.svg);
        background-repeat: no-repeat;
        background-size: 15px;
        background-position: center;
        border: 1px solid #dee2e6;
        border-left: 0;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        height: 37.5px;
        cursor: pointer;

    }

    .pagination>li>a {
        color: #01234B;
    }

}

.hold-doctor {
    // border-top: 1px solid #EDF0F4;
    border-bottom: 1.5px solid #EDF0F4;
    // padding-top: 15px;
    padding-bottom: 15px;
}

.text-position {
    color: #535F72;
    font-size: 11px;
    line-height: 20px;
    font-weight: 500;
    margin: 0;
}

.profile-link {
    color: #0072DB;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding-left: 18px;
}

.insurance {
    font-size: 15px;
    font-weight: 500;
    color: #01234B;
    display: inline;
}

.icon-ins {
    font-size: 12px;
    color: #0072DB;
}

.input-all {
    background-color: #fff !important;

    &:focus {
        box-shadow: none;
    }
}

.icon-search {
    padding-left: 17px;
    font-size: 15px;
    color: #01234B;
}

.icon-insurance {
    font-size: 18px;
    color: #01234B;
}

.icon-location {
    font-size: 18px;
    color: #01234B;
}


.span-line {
    border-right: 2px solid #A1A1A1;
    height: 80%;
    margin: auto;
}

.professions-txt {
    text-decoration: none;
    font-weight: 400;
    color: #01234B;
    font-weight: bold;
    font-size: 13px;
}

.icon-button {
    background-color: rgba(31, 193, 23, 0.63) !important;
    padding-left: 33px;
    background: url("../assets/Vector.svg") no-repeat left;
    ;
    background-size: 17px;
    line-height: 30px;
    background-position: 15px 15px;
    border: none;

    &:focus {
        border-color: #4CB147;
        box-shadow: 0 0 0 0.25rem rgb(76, 177, 71, 15%);
    }
}

.input-group {
    border: 1.5px solid #01234B;
    border-radius: 8px;
    background-color: white;
    height: 48px;
    flex-wrap: nowrap;

    .input-holder {
        display: flex;
        align-items: center;
        width: 100%;
    }
}

.link {
    text-decoration: none;
    font-weight: 400;
    color: #01234B;
    cursor: pointer;
    padding: 1px 12px;
    // margin: 5px;
    border-radius: 8px;
    font-size: 13px;

    &:hover {
        background-color: #DDFDDB;
    }
}

.rout-link {
    color: #01234B;
    font-weight: 600;
    font-size: 24px;

}

.text-profession {
    color: #01234B;
    font-size: 16px;
    font-weight: 500;
}

.city {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    display: block;
    color: #01234B;
}

.star {
    color: #ffad0d;
    font-size: 24px;

}

.star-assess {
    color: #ffad0d;
    font-size: 20px;

}

.text-worth {
    color: #273142;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
}

// .profile {
//     color: #4cb147;

// }

.profile-image {
    width: 104px;
    height: 104px;
    background-size: cover;
    background-position: center top;
}

@media screen and (max-width: 576px) {
    .profile-image {
        width: 75px;
        height: 75px;
        font-weight: 400;
        line-height: 17px;
    }

    .text-profession {
        color: #848b98;
        font-size: 15px;
    }

    .rout-link {
        color: #01234B;
        font-size: 16px;
    }

    .star {
        color: #ffad0d;
        font-size: 20px;

    }

    .star-assess {
        color: #ffad0d;
        font-size: 16px;

    }

    .text-worth {
        color: #273142;
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
    }

    .city {
        font-size: 12px;
        line-height: 24px;
    }

    .profile-link {
        color: #0072DB;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        padding-left: 13px;
        display: block;
        margin-top: 5px;
        white-space: nowrap;
    }
}
</style>
