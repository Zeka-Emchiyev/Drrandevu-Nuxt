<template>
  <div class="container-fluid p-0">
    <div class="contain-img">
<!--      <Navbar></Navbar>-->
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
                    disabled>

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
                    type="text" placeholder="Rayonlar" data-bs-toggle="modal" data-bs-target="#regionsModal" disabled>

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
                    type="text" placeholder="Klinikalar" data-bs-toggle="modal" data-bs-target="#clinicsModal" disabled>
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
                        class="bi bi-x icon-close position-absolute"></i>C
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
      <h1 class="profession-title">Ən çox axtarılan ixtisaslar</h1>
      <div class="row">
        <div class="col-6 col-md-2 my-2" v-for="profession in frequentlyUsedProfessions">
          <router-link
            :to="{ name: 'search', query: { 'prof-id': profession.id, 'region-id': '', 'clinic-id': '' }, params: { id: profession.id } }"
            class="professions-box d-block text-decoration-none">
            <img class="rounded-circle profession-photo" :src="profession.photo" alt="image">
            <p class="professions-txt ">{{ profession.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',


  data() {
    return {
      selectedProfession: '',
      active: true,
      searchProfession: '',
      searchRegion: '',
      selectedRegion: '',
      regions: '',
      clinics: '',
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
    // this.professionsApi()
    // console.log(this.$route.query)
    // this.asyncData()
    // this.regonsApi()
    // this.clinicsApi()
    this.myModalProfessions = new bootstrap.Modal(document.getElementById('professionsModal'))
    this.myModalregions = new bootstrap.Modal(document.getElementById('regionsModal'))
    this.myModalclinics = new bootstrap.Modal(document.getElementById('clinicsModal'))
  },
  async asyncData({ $axios }) {
    const resprofessions = await $axios.$get(`https://admin.drrandevu.az` + "/api-professions")
    const resregion = await $axios.$get(`https://admin.drrandevu.az` + "/api-regions")
    const resclinic = await $axios.$get(`https://admin.drrandevu.az` + "/api-clinics")
    return {
      professions:resprofessions,
      regions:resregion,
      clinics:resclinic,
    }
  },

  methods: {

    // professionsApi() {
    //   this.$axios.get(this.$apiUrl + "/api-professions")
    //     .then(response => {
    //       this.professions = response.data
    //       // console.log(this.professions)
    //       this.professions === this.frequentlyUsedProfessions
    //
    //       // console.log(this.frequentlyUsedProfessions)
    //     })
    //     .catch(e => console.log(e))
    // },
    // regonsApi() {
    //   this.$axios.get(this.$apiUrl + '/api-regions')
    //     .then(resp => {
    //       // console.log(resp)
    //       this.regions = resp.data
    //     })
    //     .catch(e => console.log(e))
    // },
    // clinicsApi() {
    //   axios.get(this.$apiUrl + '/api-clinics')
    //     .then(resp => {
    //       this.clinics = resp.data
    //     })
    // },
    select(selected) {
      this.searchRegion = selected.name
      this.selectedRegion = selected.id
      console.log(this.selectedRegion)
      this.myModalregions.hide()
    },

    selected(selected) {
      this.searchProfession = selected.name
      this.selectedProfession = selected.id
      console.log(this.selectedProfession)
      this.myModalProfessions.hide()
    },
    selectClinic(selected) {
      this.searchClinic = selected.name
      this.selectedClinic = selected.id
      console.log(this.selectedClinic)
      this.myModalclinics.hide()
    },

    searchProfessions() {
      // this.$router.push('/search/' + this.selectedProfession)
      this.$router.push({
        path: '/search',
        query: {
          'prof-id': this.selectedProfession,
          'region-id': this.selectedRegion,
          'clinic-id': this.selectedClinic
        }
      })

      // else if (this.selectedProfession != '') {
      //     // this.$router.push('/search/' + this.selectedProfession)
      //     this.$router.push({ path: '/search', query: { 'prof-id': this.selectedProfession } })
      // }
      // else if (this.selectedRegion != '') {
      //     // this.$router.push('/search/' + this.selectedProfession)
      //     this.$router.push({ path: '/search', query: { 'region-id': this.selectedRegion } })
      // }

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

<style lang="scss" scoped>
.search-title {
  color: #01234B;
  font-size: 36px;
  font-weight: 500;
  line-height: 40px;

}

.dropdown-menu {
  min-width: 310px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  inset: 3px auto auto -30px !important;
}

.search-content {
  padding-top: 40px;
  padding-bottom: 40px;
}

.btn-success {
  background-color: rgba(31, 193, 23, 0.63) !important;
}

.profession-container {
  margin-top: 40px;
  margin-bottom: 40px;
}

.span-line {
  border-right: 2px solid #A1A1A1;
  height: 80%;
  margin: 0 auto;
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

.professions-box {
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  height: 200px;
  width: 180px;
  background-color: #F2FFF2A1;
  text-align: center;
  transition: box-shadow .3s;

}

.professions-box:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, .2);


}

.profession-photo {
  height: 100px;
  border: none;
  background-color: #4CB147;
  margin-top: 20px;
  margin-bottom: 20px;
}

.professions-txt {
  text-decoration: none;
  font-weight: 500;
  color: #01234B;
  font-weight: bold;
  font-size: 18px;

}

.icon-button {
  padding-left: 33px;
  background: url("../assets/Vector.svg") no-repeat left;
  background-size: 17px;
  line-height: 30px;
  background-position: 15px 15px;
  border: none;

  &:focus {
    border-color: #4CB147;
    box-shadow: 0 0 0 0.25rem rgb(76, 177, 71, 15%);
  }
}

.input-search {
  background-color: #fff !important;

  &:focus {
    box-shadow: none;
  }
}

.input-location {
  background-color: #fff !important;

  &:focus {
    box-shadow: none;
  }
}

.input-insurance {
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

.contain-img {
  background-image: url('../assets/home.svg');
  height: 80vh;
  width: 100%;
}

.text-position {
  color: #535F72;
  font-size: 11px;
  line-height: 20px;
  font-weight: 500;
  margin: 0;
}

.link {
  text-decoration: none;
  font-weight: 400;
  color: #01234B;
  cursor: pointer;
  padding: 1px 12px;
  // margin: 5px;
  // border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  border: none !important;

  &:hover {
    background-color: #DDFDDB;
  }
}

.icon-close {
  right: 8px;
  color: #01234B;
  font-size: 23px;
}

@media screen and (max-width: 576px) {
  .icon-close {
    right: 95px;
    color: #01234B;
    font-size: 20px;
  }

  .link {
    text-decoration: none;
    font-weight: 400;
    color: #01234B;
    cursor: pointer;
    padding: 1px 12px;
    // margin: 5px;
    // border-radius: 8px;
    font-size: 16px;
    background-color: #fff;
    border: none !important;

    &:hover {
      background-color: #DDFDDB;
    }
  }

  .text-link {
    text-decoration: none;
    font-weight: 400;
    color: #01234B;
    cursor: pointer;
    padding: 1.5px 12px;
    font-size: 18px;
    background-color: #fff;
  }

  .modal-dialog-scrollable .modal-body {
    overflow-x: hidden;
    height: 100vh;
    width: 100vh;
  }



  .text-position {
    color: #535F72;
    font-size: 13px;
    line-height: 20px;
    font-weight: 500;
    margin: 0;
    padding-left: 13px;
    padding-bottom: 6px;
  }

  .dropdown-menu {
    position: fixed !important;
    margin-top: 0;
    margin-left: 0;
    min-width: auto;
    max-height: none !important;
  }

  .icon-search {
    display: none !important;
    padding-top: 12px;
    padding-left: 17px;
    font-size: 15px;
    color: #01234B;
  }

  .btn-success {
    background-color: #8DEB8B !important;
  }

  .icon-insurance {
    display: none !important;
    padding-top: 10px;
    font-size: 18px;
    color: #01234B;
  }

  .icon-location {
    display: none !important;
    padding-top: 10px;
    font-size: 18px;
    color: #01234B;
  }

  .span-line {
    // border-bottom: 1px solid #A1A1A1;
    margin: auto;
    display: none;
    // padding-left: 100%;
  }

  .icon-button {
    padding-left: 0;
    padding-right: 0;
    background-image: none;
    width: 100%;
    // background-size: 17px;
    display: block;
    text-align: center;
    margin-top: 25px;


    line-height: 30px;
    // background-position: 12px 15px;

    &:focus {
      border-color: #4CB147;
      box-shadow: 0 0 0 0.25rem rgb(76, 177, 71, 15%);
    }
  }

  .input-search {
    border-bottom: 1px solid #D2D1D1 !important;
    background-color: #fff !important;
    width: 100% !important;
    border-radius: unset;
    // padding: 10px !important;
    // text-align: center;
    background: url(../assets/icons/Vector-search.svg) no-repeat scroll 1px 14px;
    padding-left: 30px;


    &:focus {
      box-shadow: none;
    }
  }

  .input-search-profession {
    border-right: 1px solid #D2D1D1 !important;
    background-color: #fff !important;
    width: 100% !important;
    border-radius: unset;
    // padding: 10px !important;
    // text-align: center;
    background: url(../assets/icons/Vector-search.svg) no-repeat scroll 1px 8px;
    padding-left: 30px;
    outline: none;
  }

  .input-location {
    border-bottom: 1px solid #D2D1D1 !important;
    background-color: #fff !important;
    width: 100% !important;
    border-radius: unset;
    // padding: 10px !important;
    // text-align: center;
    background: url(../assets/icons/Vector-location.svg) no-repeat scroll 1px 12px;
    padding-left: 30px;


    &:focus {
      box-shadow: none;
    }
  }

  .input-insurance {
    border-bottom: 1px solid #D2D1D1 !important;
    background-color: #fff !important;
    width: 100% !important;
    // padding: 10px !important;
    // text-align: center;
    border-radius: unset;

    background: url(../assets/icons/Group.svg) no-repeat scroll 1px 12px;
    padding-left: 30px;


    &:focus {
      box-shadow: none;
    }
  }

  .search-content {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .input-group {
    border: 1.5px solid #01234B;
    border-radius: 8px;
    background-color: white;
    height: 245px;
    display: block;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 30px;
    // position: relative;
    width: 100%;
    // margin-bottom: 10px;
  }

  .input-group i {
    padding: 10px;
    position: absolute;
    text-align: center;
    display: block;
    z-index: 1;
    // background-color: #4CB147;
  }

  .contain-img {
    background-image: none;
    background-color: #F5FFF5;
    width: 100%;
    margin-bottom: 34px;
    padding-bottom: 34px;
    height: auto;
  }

  .profession-container {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .title-txt {
    font-size: 26px;
    padding-left: 10px;
  }

  .profession-title {
    font-size: 22px;
    margin-bottom: 0;

  }

  .professions-box {
    border: 1px solid #D9D9D9;
    border-radius: 10px;
    height: 150px;
    width: 150px;
    background-color: #F2FFF2A1;
    text-align: center;
    transition: box-shadow .3s;

  }

  .profession-photo {
    height: 70px;
    border: none;
    background-color: #4CB147;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .professions-txt {
    text-decoration: none;
    font-weight: 500;
    color: #01234B;
    font-weight: bold;
    font-size: 14px;

  }
}
</style>


<style>
/*TODO: globalda edit edib. modallara class ver onun daxilindeki modal-content-i edit ele.*/
@media screen and (max-width:576px) {
  .modal-content {
    border-radius: 0 !important;
    border: 0 !important;
  }

  .fade.modal-backdrop.show {
    opacity: 0 !important;
  }
}
</style>

