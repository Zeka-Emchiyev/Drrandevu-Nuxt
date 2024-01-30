<template>
  <div class="container-fluid p-0">
    <div class="contain-img">
      <Header></Header>
      <div class="search-content">

        <div class="container position-relative">
          <div class="row justify-content-md-center">
            <div class="d-none d-md-block col-md-9">
              <h1 class="title-txt animate__animated animate__bounce animate__zoomInDown search-title">
                Sizə uyğun həkim <br /> seçin və randevu götürün
              </h1>
              <div class="input-group justify-content-between">
                <div class="input-holder dropdown">
                  <i class="bi bi-search icon-search"></i>
                  <input v-model="searchProfession" class="icon dropdown-toggle form-control border-0 input-search"
                    type="text" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                    aria-label="First name" placeholder="İxtisaslar">
                  <i v-if="searchProfession.length > 0" @click="removeProfession()"
                    class="bi bi-x icon-close position-absolute"></i>

                  <div class="profession-dropdown dropdown-menu form-control  border"
                    aria-labelledby="dropdownMenuButton1">
                    <div class="d-flex justify-content-end sticky-top">
                      <button class="btn d-inline d-md-none link">Imtina</button>
                    </div>
                    <p class="dropdown-item text-position d-inline">İxtisaslar</p>

                    <div class="flex-row flex-wrap">
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
                  <i v-if="searchRegion.length > 0" @click="removeRegion()"
                    class="bi bi-x icon-close position-absolute"></i>


                  <div class="region-dropdown dropdown-menu form-control  border overflow-auto"
                    aria-labelledby="dropdownMenuButton2">
                    <div class="d-flex justify-content-end sticky-top">
                      <button class="btn d-inline d-md-none link">Imtina</button>
                    </div>
                    <p class="dropdown-item text-position d-inline">Rayonlar</p>
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
                  <i v-if="searchClinic.length > 0" @click="removeClinic()"
                    class="bi bi-x icon-close position-absolute"></i>

                  <div class="clinic-dropdown dropdown-menu form-control  border" aria-labelledby="dropdownMenuButton3">
                    <div class="d-flex justify-content-end sticky-top">
                      <button class="btn d-inline d-md-none link">Imtina</button>
                    </div>
                    <p class="dropdown-item text-position d-inline">Klinikalar</p>

                    <div class="flex-row flex-wrap">
                      <div @click="selectClinic(clinic)" class="dropdown-item link" v-for="clinic in filterClinics">
                        {{ clinic.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <button @click="searchProfessions()" class="icon-button btn btn-success rounded-start">
                  <span class="d-block d-md-none" style="color: #01234B;">Axtar</span>
                </button>
              </div>
            </div>

            <!-- Part of  Mobile -->

            <div class="d-block d-md-none col-md-9">
              <h1 class="title-txt animate__animated animate__bounce animate__zoomInDown">
                Sizə uyğun həkim <br /> seçin və randevu götürün
              </h1>
              <div class="input-group justify-content-between">
                <div class="input-holder dropdown">
                  <i class="bi bi-search icon-search"></i>
                  <input v-model="searchProfession" class="icon dropdown-toggle form-control border-0 input-search"
                    type="text" placeholder="İxtisaslar" data-bs-toggle="modal" data-bs-target="#professionsModal"
                    >

                </div>

                <!-- Modal Professions-->
                <div class="modal fade " data-bs-backdrop="static" id="professionsModal" tabindex="-1"
                  aria-labelledby="professionsModalLabel" aria-hidden="true" data-bs-keyboard="false">
                  <div class="modal-dialog modal-dialog-scrollable m-0 h-100">
                    <div class="modal-content">
                      <div class="modal-header position-relative">
                        <i v-if="searchProfession.length > 0" @click="removeProfession()"
                          class="bi bi-x icon-close position-absolute"></i>

                        <input v-model="searchProfession" class="icon border-0 input-search-profession" type="text"
                          placeholder="İxtisaslar">
                        <button type="button" class="link" data-bs-dismiss="modal">Imtina</button>
                      </div>
                      <div class="modal-body">

                        <p class="dropdown-item text-position">İxtisaslar</p>

                        <div class="flex-row flex-wrap">
                          <div @click="selected(profession)" class="dropdown-item text-link"
                            v-for="profession in filterProfessions">
                            {{ profession.name }}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="input-holder dropdown">
                  <span class="span-line"></span>
                  <i class="bi bi-geo-alt-fill icon-location ms-2"></i>

                  <input v-model="searchRegion" class="icon dropdown-toggle form-control border-0 input-location"
                    type="text" placeholder="Rayonlar" data-bs-toggle="modal" data-bs-target="#regionsModal" >

                </div>


                <!-- Modal Regions-->
                <div class="modal fade" data-bs-backdrop="static" id="regionsModal" tabindex="-1"
                  aria-labelledby="regionsModalLabel" aria-hidden="true" data-bs-keyboard="false">
                  <div class="modal-dialog modal-dialog-scrollable m-0 h-100">
                    <div class="modal-content">
                      <div class="modal-header position-relative">
                        <i v-if="searchRegion.length > 0" @click="removeRegion()"
                          class="bi bi-x icon-close position-absolute"></i>
                        <input v-model="searchRegion" class="icon border-0 input-search-profession" type="text"
                          placeholder="Rayonlar">
                        <button type="button" class="link" data-bs-dismiss="modal">Imtina</button>
                      </div>
                      <div class="modal-body">

                        <p class="dropdown-item text-position">Rayonlar</p>

                        <div class="flex-row flex-wrap">
                          <div @click="select(region)" class="dropdown-item text-link" v-for="region in filterRegions">
                            {{ region.name }}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="input-holder dropdown">
                  <span class="span-line"></span>
                  <i class="bi bi-shield-check icon-insurance ms-2"></i>

                  <input v-model="searchClinic" class="icon dropdown-toggle form-control border-0 input-insurance"
                    type="text" placeholder="Klinikalar" data-bs-toggle="modal" data-bs-target="#clinicsModal" >
                </div>

                <button @click="searchProfessions()" class="icon-button btn btn-success rounded-start">
                  <span class="d-block d-md-none" style="color: #01234B;">Axtar</span>
                </button>
              </div>

              <!-- Modal Clinics-->
              <div class="input-modal modal fade " data-bs-backdrop="static" id="clinicsModal" tabindex="-1"
                aria-labelledby="clinicsModalLabel" aria-hidden="true" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-scrollable m-0 h-100">
                  <div class="modal-content">
                    <div class="modal-header position-relative">
                      <i v-if="searchClinic.length > 0" @click="removeClinic()"
                        class="bi bi-x icon-close position-absolute"></i>
                      <input v-model="searchClinic" class="icon border-0 input-search-profession" type="text"
                        placeholder="Klinikalar">
                      <button type="button" class="link" data-bs-dismiss="modal">Imtina</button>
                    </div>
                    <div class="modal-body">

                      <p class="dropdown-item text-position">Klinikalar</p>

                      <div class="flex-row flex-wrap">
                        <div @click="selectClinic(clinic)" class="dropdown-item text-link"
                          v-for="clinic in filterClinics">
                          {{ clinic.name }}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
    <div class="container profession-container">
      <h2 class="profession-title">Ən çox axtarılan ixtisaslar</h2>
      <div class="row">
        <div class="col-6 col-md-2 my-2" v-for="profession in frequentlyUsedProfessions">
          <nuxt-link
            :to="{ name: 'search', query: { 'prof-id': profession.id }, params: { id: profession.id } }"
            class="professions-box d-block text-decoration-none">
            <img class="rounded-circle profession-photo" :src="profession.photo" :alt="profession.name">
            <p class="professions-txt ">{{ profession.name }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'assets/Scss/Home.scss'
import 'assets/Scss/Global.scss'

export default {
  name: 'Index',
  layout:'default',

  data() {
    return {
      selectedProfession: '',
      active: true,
      searchProfession: '',
      searchRegion: '',
      selectedRegion: '',
      searchClinic: '',
      selectedClinic: '',
      frequentlyUsedProfessions: [
        {
          id: 23,
          name: 'Stomatoloq',
          photo: require('@/assets/Vector-tooth.png')
        },
        {
          id: 48,
          name: 'Dermatoloq',
          photo: require('@/assets/Vector-dermatoloq.png')

        },
        {
          id: 21,
          name: 'Psixiatr',
          photo: require('@/assets/Vector-psixiatr.png')

        },
        {
          id: 47,
          name: 'Oftalmoloq',
          photo: require('@/assets/Vector-oftalmoloq.png')

        },
        {
          id: 26,
          name: 'Terapevt',
          photo: require('@/assets/Vector-heart.png')

        },
        {
          id: 11,
          name: 'Mama-ginekoloq',
          photo: require('@/assets/Vector-ginekoloq.png')

        },
      ]
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
    }
  },

  mounted() {
    this.myModalProfessions = new bootstrap.Modal(document.getElementById('professionsModal'))
    this.myModalregions = new bootstrap.Modal(document.getElementById('regionsModal'))
    this.myModalclinics = new bootstrap.Modal(document.getElementById('clinicsModal'))
  },
  async asyncData({ $axios }) {
    const apiUrl = process.env.API_URL
    const resProfessions = await $axios.$get(apiUrl + "/api-professions")
    const resRegion = await $axios.$get(apiUrl + "/api-regions")
    const resClinic = await $axios.$get(apiUrl+ "/api-clinics")
    return {
      professions:resProfessions,
      regions:resRegion,
      clinics:resClinic,
    }
  },

  methods: {

    select(selected) {
      this.searchRegion = selected.name
      this.selectedRegion = selected.id
      this.myModalregions.hide()
    },

    selected(selected) {
      this.searchProfession = selected.name
      this.selectedProfession = selected.id
      this.myModalProfessions.hide()
    },
    selectClinic(selected) {
      this.searchClinic = selected.name
      this.selectedClinic = selected.id
      this.myModalclinics.hide()
    },

    searchProfessions() {
      this.$router.push({
        path: '/search',
        query: {
          'prof-id': this.selectedProfession,
          'region-id': this.selectedRegion,
          'clinic-id': this.selectedClinic
        }
      })
    },
    removeProfession() {
      this.searchProfession = ''
    },
    removeRegion() {
      this.searchRegion = ''
    },
    removeClinic() {
      this.searchClinic = ''
    }

  },
};
</script>

