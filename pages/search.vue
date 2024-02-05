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
                <div
                  class="rounded-circle border profile-image"
                  :style="{ 'background-image': 'url(' + $config.apiUrl + '/' + doctor.profile_photo + ')' }"
                >
                </div>
                <nuxt-link class="text-decoration-none profile-link" :to="{ name: 'doctor-slug', params: { slug: doctor.slug } }">
                  Profilə bax
                </nuxt-link>

              </div>
              <div class="col-9 col-lg-10">

                <Nuxt-link :to="{ name: 'doctor-slug', params: { slug: doctor.slug } }"
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
                  <div class="profile-image-modal rounded"
                       :style="{'background-image':'url(' + $config.apiUrl + '/' + selectedDoctor.profile_photo + ')'}">
                  </div>
                </div>
                <div class="col-9 col-md-10">
                  <h6 class="fullname">{{ selectedDoctor.fullname }}, {{ selectedDoctor.profession }} </h6>
                  <p  class="time-zone"> {{ $moment(selectedDay).format('DD MMMM YYYY dddd') }} - {{ selectedTime }}</p>
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
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content h-100">
          <div class="modal-header">
            <nuxt-link to="/" class="text-decoration-none" >
              <h5 class="modal-title head ms-3" id="takeAppointmentModalLabel" data-bs-dismiss="modal">Doctonline</h5>
            </nuxt-link>
          </div>
          <div class="modal-body mt-4">
            <div class="d-flex gap-3">
              <div class="">
                <div class="profile-image rounded" :style="{'background-image':'url(' + $config.apiUrl + '/' + selectedDoctor.profile_photo + ')'}">
                </div>
              </div>
              <div class="">
                <h6 class="fullname">{{ selectedDoctor.fullname }}, {{ selectedDoctor.profession }} </h6>
                <div class="time-zone mb-2"> {{ $moment(selectedDay).format('DD MMMM YYYY dddd') }} - {{ selectedTime }}</div>
                <div class="doctor-clinic">{{ selectedDoctor.clinic }}</div>
              </div>
            </div>
            <p class="ms-4 fullname mt-4">
              <img class="pe-2" src="@/assets/icons/check-circle.svg" alt="">
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



export default {
  name: 'Search',
  layout:'default',
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
      selectedDay: null,//$moment().toDate().toISOString(),
      selectedTime: '',
      filteredObjects: [],
      hasSelectedTime: false,

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
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'))
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
      doctors: data,
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
      if (this.hasSelectedTime) {
        alert(this.result.message)
        return;
      }
      this.selectedDoctor = data.doctor
      this.selectedTime = data.time
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
      let is_valid = this.formValidationClass();
      if (is_valid) {
        this.form.doctor_id = this.selectedDoctor.id;
        this.form.date = this.$moment(this.selectedDay).format('YYYY-MM-DD HH:mm');
        this.form.time = this.selectedTime;

        this.$axios
          .post(this.$config.apiUrl + '/api-appointments/create', this.form)
          .then((resp) => {
            this.result = resp.data;
            this.myModal.hide();
            this.successModal.show();
            if (this.result) {
              this.hasSelectedTime = true; // Mark that time has been selected
              console.log(this.selectedTime, 'select');
              // You may return this.selectedTime here if needed
            }
          })
          .catch((e) => console.log(e));

        this.form.fullname = '';
        this.form.phone = '';
      }
    },

  },
};
</script>
<style lang="scss" scoped>
@import "assets/Scss/Search";
</style>
