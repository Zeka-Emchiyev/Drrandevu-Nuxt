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
              <input id="dropdownMenuButton1" v-model="searchProfession"
                     aria-expanded="false" aria-label="First name"
                     class="icon dropdown-toggle form-control border-0 input-all" data-bs-toggle="dropdown"
                     placeholder="İxtisaslar" type="text">

              <div aria-labelledby="dropdownMenuButton1"
                   class="dropdown-menu form-control  border overflow-auto" style="max-height:360px; min-width:280px">
                <p class="dropdown-item text-position">İxtisaslar</p>

                <div class="flex-row flex-wrap ">
                  <div v-for="profession in filterProfessions" class="dropdown-item link"
                       @click="selectProfession(profession)">
                    {{ profession.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="input-holder dropdown">
              <span class="span-line"></span>
              <i class="bi bi-geo-alt-fill icon-location ms-2"></i>
              <input id="dropdownMenuButton2" v-model="searchRegion"
                     aria-expanded="false" aria-label="First name"
                     class="icon dropdown-toggle form-control border-0 input-location" data-bs-toggle="dropdown"
                     placeholder="Rayonlar" type="text">

              <div aria-labelledby="dropdownMenuButton2"
                   class="dropdown-menu form-control  border overflow-auto" style="max-height:360px; min-width:280px">
                <p class="dropdown-item text-position">Rayonlar</p>

                <div class="flex-row flex-wrap">
                  <div v-for="region in filterRegions" class="dropdown-item link" @click="selectRegion(region)">
                    {{ region.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="input-holder dropdown">
              <span class="span-line"></span>
              <i class="bi bi-shield-check icon-insurance ms-2"></i>

              <input id="dropdownMenuButton3" v-model="searchClinic"
                     aria-expanded="false" aria-label="First name"
                     class="icon dropdown-toggle form-control border-0 input-insurance" data-bs-toggle="dropdown"
                     placeholder="Klinikalar" type="text">

              <div aria-labelledby="dropdownMenuButton3"
                   class="dropdown-menu form-control  border overflow-auto" style="max-height:365px; min-width:280px">
                <p class="dropdown-item text-position">Klinikalar</p>

                <div class="flex-row flex-wrap">
                  <div v-for="clinic in filterClinics" class="dropdown-item link"
                       @click="selectClinic(clinic)">
                    {{ clinic.name }}
                  </div>
                </div>
              </div>
            </div>

            <button class="icon-button btn btn-success bg-success rounded-start ms-1"
                    @click="searchProfessions()"></button>

          </div>
        </div>


      </div>


      <div v-for="doctor in paginatedDoctors" class="hold-doctor">
        <div class="row">
          <div class="col-md-8">
            <div class="row mt-4">
              <div class="col-3 col-lg-2">
                <div :style="{'background-image': 'url(' + `http://159.223.22.111/${doctor.profile_photo}` + ')'}"
                     class="rounded-circle border profile-image">
                </div>
                <nuxt-link class="text-decoration-none profile-link" :to="{ name: 'doctor-doctor', params: { slug: doctor.slug } }">
                  Profilə bax {{doctor.id}}
                </nuxt-link>

              </div>
              <div class="col-9 col-lg-10">

                <Nuxt-link :to="{ name: 'doctor-doctor', params: { slug: doctor.slug } }"
                             class="text-decoration-none rout-link">
                  {{ doctor.fullname }}
                </Nuxt-link>
                <span class="text-profession" style="display: block;">{{ doctor.profession }}</span>
                <span class="city mb-1">{{ doctor.address }} </span>
                <span class="city fw-bold">{{ doctor.clinic }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <Calendar2
              @dateSelected="showSelectedAppointmentModal"
              :doctor="doctor"
              :selected-doctor="selectedDoctor"
              @showMore="showMoreSlotsForDoctor"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-5">
        <pagination v-model="pagination.page" :options="pagination.options" :per-page="pagination.perPage"
                    :records="doctors.length" class="search-pagination" @paginate="myCallback"/>
      </div>
    </div>
    <MoreSlotsModal
      :show="showMoreSlotsModal"
      :doctor="moreSlotsDoctor"
      @closeModal="showMoreSlotsModal = false"
      @dateSelected="showSelectedAppointmentModal"
    />
    <!-- Modal -->
    <div class="modal fade" id="takeAppointmentModal" tabindex="-1" aria-labelledby="takeAppointmentModalLabel"
         aria-hidden="hidden">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title head ms-3" id="takeAppointmentModalLabel">Doctonline</h5>
          </div>
          <div class="modal-body position-relative">
            <button type="button" class="btn-close position-absolute" style="right: 15px; opacity: 0.2;"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="container align-items-center justify-content-center my-4 pt-md-3">
              <div class="row">
                <div class="col-3 col-md-2">
                  <div class="profile-image rounded"
                       :style="{
                                            'background-image': 'url(' + `http://159.223.22.111/${selectedDoctor.profile_photo}` + ')'
                                         }">
                  </div>
                </div>
                <div class="col-9 col-md-10">
                  <h6 class="fullname">{{ selectedDoctor.fullname }}, {{ selectedDoctor.profession }} </h6>
                  <p  class="time-zone"> {{ moment(selectedDay).format('DD MMMM YYYY dddd') }} - {{ selectedTime }}</p>
                  <p>{{ selectedDoctor.clinic }}</p>
                </div>

                <div class="col-8">
                  <label class="doc-profession-modal mb-2 mt-2" for="">Ad, Soyad</label>
                  <input v-model="form.fullname" :class="{'form-control':true, 'input-error': !formValidation.fullname}" type="text" placeholder="Firəngiz Vahabova">
                </div>
                <div class="mb-1 col-8 mt-2 doc-profession-modal">
                  <label class="mb-2 " for="">Mobil nömrə</label>
                  <input v-model="form.phone" :class="{'form-control':true, 'input-error': !formValidation.phone}" type="number" placeholder="0501234567">
                </div>
              </div>
              <button type="button" class="col-12 btn btn-primary mt-5" @click="createAppointment">
                <div class="doc-profession-button">
                  Randevunu təsdiqləyin
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal result -->
    <div id="successModal" aria-hidden="true" aria-labelledby="successModalLabel" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">
            <p class="clinic-border text-center"><i class="bi bi-check-circle-fill d-block fs-1 "
                                                    style="color: #4CB147; "></i>
              {{ result.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import 'moment/locale/az';
import moment from 'moment'


export default {
  name: 'Search',
  components: {
    Pagination,
  },
  data() {
    return {
      selectedProfession: '',
      searchProfession: '',
      searchRegion: '',
      selectedRegion: '',
      searchClinic: '',
      selectedClinic: '',
      regionsDoctors: null,
      selectedDay: null,//moment().toDate().toISOString(),
      selectedTime: '',
      filteredObjects: [],

      form: {
        date: null,
        doctor_id: null,
        email: null,
        fullname: null,
        phone: null,
        time: null,
      },
      formValidation:{
        phone: true,
        fullname: true
      },
      showMoreSlotsModal: false,
      moreSlotsDoctor: null,
      selectedDoctor: {},
      appointmentDate: null,
      selectedDate: null,
      moment,
      result: '',
      itemsPerPage: 10,
      currentPage: 1,
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
    this.myModal = new bootstrap.Modal(document.getElementById('takeAppointmentModal'), {
      backdrop: 'static',
      keyboard: false
    })
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'), {
      backdrop: 'static',
      keyboard: false
    })
  },
  async asyncData({$axios, query}) {
    const apiUrl = process.env.API_URL
    const profession = await $axios.get(apiUrl + "/api-professions")
    const region = await $axios.get(apiUrl + "/api-regions")
    const clinic = await $axios.get(apiUrl + "/api-clinics")

    const {data} = await $axios.get(apiUrl + '/api-doctors', {
      params: {
        'prof-id': query['prof-id'],
        'region-id': query['region-id'],
        'clinic-id': query['clinic-id'],
      },
    })
    return {
      professions: profession.data,
      regions: region.data,
      clinics: clinic.data,
      doctors: data
    }
  },
  methods: {
    myCallback(page) {
      console.log(this.pagination.page)
      window.scroll(0, 0)
    },
    showMoreSlotsForDoctor(doctor) {
      this.moreSlotsDoctor = doctor;
      console.log(doctor, 'search page')
      this.showMoreSlotsModal = true;
    },
    selectProfession(selected) {
      this.searchProfession = selected.name
      this.selectedProfession = selected.id
    },
    selectRegion(selected) {
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
      const queryParams = {
        'prof-id': this.selectedProfession,
        'region-id': this.selectedRegion,
        'clinic-id': this.selectedClinic,
      };
      const queryString = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
      const newUrl = window.location.pathname + '?' + queryString;
      window.location.href = newUrl;
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
    formValidationClass(){
      this.formValidation = {
        phone: !!this.form.phone,
        fullname: !!this.form.fullname,
      }
      return Object.values(this.formValidation).every((v) => v)
    },
    createAppointment() {
      let is_valid = this.formValidationClass()
      if (is_valid){
        this.form.doctor_id = this.selectedDoctor.id
        this.form.date = moment(this.selectedDay).format('YYYY-MM-DD HH:mm')
        this.form.time = this.selectedTime
        $axios.post('http://159.223.22.111' + "/api-appointments/create", this.form)
          .then((resp) => {
            console.log(resp)
            this.result = resp.data
            this.myModal.hide()
            this.successModal.show()
          })
          .catch(e => console.log(e))
        this.form.fullname = ''
        this.form.phone = ''
      }
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

  .pagination > li > a {
    color: #01234B;
  }

}

.hold-doctor {
  // border-top: 1px solid #EDF0F4;
  border-bottom: 1.5px solid #EDF0F4;
  // padding-top: 15px;
  padding-bottom: 15px;
}
.input-error {
  border:1px solid red;
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
  background: url("../assets/Vector.svg") no-repeat left;;
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
