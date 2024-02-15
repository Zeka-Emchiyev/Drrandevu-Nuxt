<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <div class="row">
            <div class="col-3 col-sm-4 col-md-5 col-lg-4 col-xl-3 ">
              <div class="profile-image-main" :style="{'background-image': 'url(' + $config.apiUrl + '/'+ doctor.profile_photo + ')'}"></div>
            </div>

            <div class="col-9 col-sm-8 col-md-7 col-lg-8 col-xl-9 ">
              <h5 class="name-surname">{{ doctor.fullname }}</h5>
              <span class="doc-profession" style="display:block ;">{{ doctor.profession }}</span>
              <div class="d-none d-md-flex flex-row mb-2">
                <p class="city">{{ doctor.address }} {{ doctor.city }}</p>

              </div>

            </div>

          </div>
          <hr>
          <div class="container ms-2">
            <div class="row">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="col-2 text-header" :class="{ 'text-header-bottom-line': selectedHeader === 'information' }"
                    href="#scrollspyHeading2" @click="selectedHeader = 'information'">Haqqında
                  </a>

                </li>

                <li class="nav-item">
                  <a class="col-2 text-header" :class="{ 'text-header-bottom-line': selectedHeader === 'insurance' }"
                    href="#scrollspyHeading3" @click="selectedHeader = 'insurance'">Sığorta</a>
                </li>
                <li class="nav-item">
                  <a class="col-2 text-header" :class="{ 'text-header-bottom-line': selectedHeader === 'location' }"
                    href="#scrollspyHeading1" @click="selectedHeader = 'location'">Ünvan</a>
                </li>

                <li class="nav-item">
                  <a class="col-2 text-header" :class="{ 'text-header-bottom-line': selectedHeader === 'comment' }"
                    href="#scrollspyHeading4" @click="selectedHeader = 'comment'">Rəylər</a>
                </li>
                <li class="nav-item">
                  <a class="col-2 text-header" :class="{ 'text-header-bottom-line': selectedHeader === 'faq' }"
                    href="#scrollspyHeading5" @click="selectedHeader = 'faq'">ÇSS</a>
                </li>
              </ul>

            </div>
          </div>

          <hr>

          <div class="container">
            <div class="row">
              <div class="col-7">
                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example"
                  tabindex="0">
                  <h2 class="mb-4 head" id="scrollspyHeading2"> Haqqında</h2>

                  <!-- <p class="number">{{ doctor.phone }}</p> -->

                </div>
              </div>
            </div>


            <!-- Modal details content -->
            <div class="modal fade" id="informationModal" tabindex="-1" aria-labelledby="informationModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 class="modal-title" id="informationModalLabel">Məlumat</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body text">{{ doctor.description }}</div>

                </div>
              </div>
            </div>

            <p class="text">{{ doctor.description }}
              <span class="text-primary" data-bs-toggle="modal" data-bs-target="#informationModal">
                Ətraflı
              </span>
            </p>
              <div class="d-block d-md-none">
              <div class="randevu-title mb-1">Pulsuz randevu təyin et</div>
              <div class="container">
                  <div class="row">
                      <div @click="selectedBox = 'clinic'" class="col-6 rounded-start b-default m-auto"
                           :class="{ 'clinic-border': selectedBox === 'clinic' }">

                          <div class="hold-on">
                              <i class="icon-clinic bi bi-person-fill "></i>
                              <span class="clinic-video-txt">Klinikada</span>
                          </div>
                      </div>
                      <div @click="selectedBox = 'video'" class=" col-6 rounded-end b-default"
                           :class="{ 'clinic-border': selectedBox === 'video' }">
                          <div class="hold-on">
<!--                              <img class="icon-clinic" src="../assets/Group 432.svg" alt="">-->
                              <span class="clinic-video-txt">Video</span>
                          </div>

                      </div>
                  </div>
                </div>
                  <div class="location-content mt-3">
                      {{ doctor.clinic }}
                  </div>
                  <Calendar2  @dateSelected="showSelectedAppointmentModal"
                              :doctor="doctor"
                              @showMore="showMoreSlotsForDoctor"
                              :selected-doctor="doctor"
                              v-if="doctor.id"
                              :buttonLink="buttonLink"
                              />

              </div>
              <MoreSlotsModal
                      :show="showMoreSlotsModal"
                      :doctor="moreSlotsDoctor"
                      @closeModal="showMoreSlotsModal = false"
                      @dateSelected="showSelectedAppointmentModal"
              />
            <h2 id="scrollspyHeading3" class="mb-4 head">Sığorta </h2>
            <div>
              <!-- {{ doctor. }} -->
            </div>
            <h2 class="head" id="scrollspyHeading1">Ünvan</h2>
            <div>
              <h3 class="head-ege">{{ doctor.clinic }}</h3>
              <p class="street">{{ doctor.address }}</p>
            </div>


            <div class="row">
              <div class="col mb-3">
                <button class="text-kanal text-nowrap border-0" v-for="service in doctor.services">{{
                  service
                }}</button>
              </div>
              <!-- <div class="col-1"><img src="../assets/more.png" alt=""></div> -->
            </div>

            <div>
              <h2 class="mb-4 mt-3 head">İş təcrübəsi</h2>

            </div>
            <div>
              <p class="text-experience">{{ doctor.experiences }}</p>
            </div>

            <h2 class="mb-4 head">Təhsil</h2>
            <p class="text">{{ doctor.educations }}</p>
            <p class="txt-light">Kurs</p>
            <p class="text">{{ doctor.courses }}</p>

            <p class="txt-light">Konqresslər</p>
            <p class="text">{{ doctor.congress }}</p>


            <FaqHolder id="scrollspyHeading5" />
          </div>

        </div>
        <div class="col-md-5 shadow p-3 mb-5 bg-body rounded h-50 d-none d-md-flex  ">
          <div class="container">
            <h2 class="randevu-title">Pulsuz randevu təyin et</h2>
            <p class="randevu-type">Randevu tipini seçin</p>

            <!-- <div class="row justify-content-start ms-1">

              <div class="col-6">
                <div @click="selectedBox = 'clinic'"
                  class="row justify-content-center align-items-center rounded b-default"
                  :class="{ 'clinic-border': selectedBox === 'clinic' }" style="height:80px; width: 220px;">
                  <div class="col-3">
                    <i class="icon-clinic bi bi-person-fill border rounded-circle p-1"></i>
                  </div>
                  <div class="col-9 pt-3 ">
                    <p class="mb-0">Klinikada</p>
                    <p>{{ doctor.online_service_price }} AZN</p>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div @click="selectedBox = 'video'"
                  class="row justify-content-center align-items-center rounded b-default"
                  :class="{ 'clinic-border': selectedBox === 'video' }" style="height:80px; width: 220px;">
                  <div class="col-3">
                    <i class="icon-video bi bi-camera-video border rounded-circle p-1"></i>
                  </div>
                  <div class="col-9 pt-3 ">
                    <p class="mb-0">Video</p>
                    <p>{{ doctor.online_service_price }} AZN</p>
                  </div>
                </div>
              </div>
            </div> -->


            <div class="row text-center ms-1 ">

              <div @click="selectedBox = 'clinic'" class="col-6 rounded-start b-default m-auto"
                :class="{ 'clinic-border': selectedBox === 'clinic' }">

                <div class="hold-on">
                  <i class="icon-clinic bi bi-person-fill "></i>
                  <span class="clinic-video-txt">Klinikada</span>
                </div>
              </div>
              <div @click="selectedBox = 'video'" class=" col-6 rounded-end b-default"
                :class="{ 'clinic-border': selectedBox === 'video' }">
                <div class="hold-on">
<!--                  <img class="icon-clinic" src="../assets/Group 432.svg" alt="">-->
                  <span class="clinic-video-txt">Video</span>
                </div>

              </div>
            </div>


            <div>
              <p class="location-content my-3">
                {{ doctor.clinic }}</p>
            </div>
            <div class="d-none d-md-block">
              <client-only>
              <carousel ref="cr-2" id="cr-2" :per-page="4" :navigation-enabled="true" :pagination-enabled="false"
                        navigationPrevLabel="" navigationNextLabel="" :navigationClickTargetSize="4" :scrollPerPage="false">
                <slide v-for="day in monthlyDates" :key="$moment(day.date).format('MMM DD')">
                  <div @click="setDay(day.date)" class="day-container"
                    :class="{ 'bg-success text-white': selectedDay === day.date }">
                     {{ $moment(day.date).format('MMM DD') }}
                  </div>
                  <div class="time-slots mt-4">
                    <div v-for="(timeSlot, index) in day.timeSlots">
                      <div v-if="index < 4 && !day.showMore" class="time-slot"
                        :class="{ 'bg-success text-white': selectedTime === timeSlot.timeFormatted && selectedDay === day.date }"
                        @click="setSelectedTime(day, timeSlot)">
                        {{ timeSlot.timeFormatted }}
                      </div>
                      <div v-if="day.showMore" class="time-slot"
                        :class="{ 'bg-success text-white': selectedTime === timeSlot.timeFormatted && selectedDay === day.date }"
                        @click="setSelectedTime(day, timeSlot)">
                        {{ timeSlot.timeFormatted }}
                      </div>
                    </div>
                    <div v-show="!day.showMore" class="time-slot slot-more" @click="showMoreTimeSlots(day)">daha çox
                    </div>
                    <div v-show="day.showMore" class="time-slot slot-more" @click="showMoreTimeSlots(day, false)">daha
                      az</div>
                  </div>
                </slide>
              </carousel>
              </client-only>

            </div>

            <div class="text-center mt-2">
              <button data-bs-toggle="modal" data-bs-target="#takeAppointmentModal"
                      :class="{ 'text-white': !dateTimeSelected }" class="btn btn-primary d-none d-md-block col-11 my-3 mx-auto"
                      :disabled="!dateTimeSelected">
                Randevu al
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- Modal -->
      <div class="modal fade" id="takeAppointmentModal" tabindex="-1" aria-labelledby="takeAppointmentModalLabel"
        aria-hidden="hidden">
        <div class="modal-dialog">
          <div class="modal-content h-100">
            <div class="modal-header">
                <router-link to="/" class="text-decoration-none">
                    <h5 class="modal-title head ms-3" id="takeAppointmentModalLabel" data-bs-dismiss="modal">Doctonline</h5>
                </router-link>
            </div>
            <div class="modal-body position-relative">
              <button type="button" class="btn-close position-absolute" style="right: 15px; opacity: 0.2;"
                data-bs-dismiss="modal" aria-label="Close"></button>
              <div class="container align-items-center justify-content-center my-5 ">
                  <div class="d-flex gap-3">
                      <div class="">
                          <div class="profile-image rounded" :style="{'background-image': 'url(' +$config.apiUrl + '/'+ doctor.profile_photo + ')'}">
                          </div>
                      </div>
                      <div class="">
                          <h6 class="fullname">{{ doctor.fullname }}, {{ doctor.profession }} </h6>
                          <div class="time-zone mb-2"> {{ $moment(selectedDay).format('DD MMMM YYYY dddd') }} - {{ selectedTime }}</div>
                          <div class="doctor-clinic">{{ doctor.clinic }}</div>
                      </div>
                  </div>

                <div class="mt-4 col-8">
                  <p class="doc-profession-modal"> Təsdiq üçün məlumatları doldurun</p>
                  <div>
                    <label class="doc-profession-modal mb-2 mt-2" for="">Ad, Soyad</label>
                    <input v-model="form.fullname" :class="{'form-control':true, 'input-error': !formValidation.fullname}" type="text" placeholder="Firəngiz Vahabova">
                  </div>
                </div>
                <div class="mb-1 col-8 mt-2 doc-profession-modal">
                  <label class="mb-2 " for="">Mobil nömrə</label>
                  <input v-model="form.phone" :class="{'form-control':true, 'input-error': !formValidation.phone}" type="number" placeholder="0501234567">
                </div>
              </div>
              <button type="button" class="col-12 btn btn-primary mb-4" @click="createAppointment">
                <div class="doc-profession-button">
                  Randevunu təsdiqləyin
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- Modal success -->
      <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content h-100">
            <div class="modal-header">
                <router-link to="/" class="text-decoration-none" >
                  <h5 class="modal-title head ms-3" id="takeAppointmentModalLabel" data-bs-dismiss="modal">Doctonline</h5>
                </router-link>
            </div>
            <div class="modal-body mt-4">
                    <div class="d-flex gap-3">
                        <div class="">
                            <div class="profile-image rounded" :style="{'background-image': 'url(' + $config.apiUrl + '/'+ doctor.profile_photo + ')'}">
                            </div>
                        </div>
                        <div class="">
                            <h6 class="fullname">{{ doctor.fullname }}, {{ doctor.profession }} </h6>
                            <div class="time-zone mb-2"> {{ $moment(selectedDay).format('DD MMMM YYYY dddd') }} - {{ selectedTime }}</div>
                            <div class="doctor-clinic">{{ doctor.clinic }}</div>
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
  </div>
</template>
<script>

import FaqHolder from "@/components/FaqHolder.vue";
import NavbarDoctor from "@/components/NavbarDoctor.vue";
// import GoogleMapLoader from '@/components/GoogleMapLoader.vue';
import Calendar2 from "@/components/Calendar2.vue";
import MoreSlotsModal from "@/components/MoreSlotsModal.vue";
export default {
  name: 'slug',
  layout:'doctor',
  components: {MoreSlotsModal, Calendar2, FaqHolder, NavbarDoctor,  },
  data() {
    return {
      selectedDay: null,//$moment().toDate().toISOString(),
      selectedTime: '',
      selectedHeader: 'information',
      selectedBox: 'clinic',
      monthlyDates: [],
      timeSlots: [],
      doctor:{},
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
        appointmentDate: null,
      result: '',
        buttonLink: true,
    };
  },
  computed: {
    dateTimeSelected() {
      return this.selectedDay && this.selectedTime
    }
  },
  mounted() {
    this.takeAppointmentModal = new bootstrap.Modal(document.getElementById('takeAppointmentModal'), { backdrop: 'static', keyboard: false })
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'),{ backdrop: 'static', keyboard: false })
  },
  async fetch() {
    try {
      const doctorId = this.$route.params.slug.split('-').slice(-1)[0];
      const response = await this.$axios.get(this.$config.apiUrl + "/api-doctors?doctor-id=" + doctorId);
      this.doctor = response.data;
      this.generateTimeSlots()
      this.generateDays()
      this.monthlyDatesSlot()
    } catch (e) {
      console.error(e);
    }
  },
  head() {
    return {
      title: 'Həkim profili',
      meta: [
        {
          hid: 'doctor:description',
          name: this.doctor.fullname,
          content: this.doctor.profession
        }
      ],
    }
  },

  methods: {

      formValidationClass(){
          this.formValidation = {
              phone: !!this.form.phone,
              fullname: !!this.form.fullname,
          }
          return Object.values(this.formValidation).every((v) => v)
      },
      showMoreSlotsForDoctor(doctor) {
          this.moreSlotsDoctor = doctor;
          this.showMoreSlotsModal = true;
      },
      showSelectedAppointmentModal(data) {
          this.selectedDoctor = data.doctor
          this.selectedTime = data.time
          this.selectedDay = data.date
          this.takeAppointmentModal.show()
      },
    createAppointment() {
        let is_valid = this.formValidationClass()
        if (is_valid) {
            this.form.doctor_id = this.doctor.id
            this.form.date = this.$moment(this.selectedDay).format('YYYY-MM-DD HH:mm')
            this.form.time = this.selectedTime;
            this.$axios.post(this.$config.apiUrl + "/api-appointments/create", this.form)
                .then((resp) => {
                    console.log(resp)
                    this.result = resp.data
                    this.takeAppointmentModal.hide()
                    this.successModal.show()
                })
                .catch(e => console.log(e))
        }
            this.form.fullname = ''
            this.form.phone = ''
    },
    generateDays() {
      // todo : 6ci gunleri hekimden yoxlamaq. bazar gunlerini cixarmaq.
      // const today = $moment()
      const tomorrow = this.$moment().add(1, 'days');
      const monthLater = this.$moment().add(1, 'month')
      let enumerateDaysBetweenDates = (startDate, endDate) => {
        let now = startDate.clone(), dates = [];
        let i = 0;
        while (now.isSameOrBefore(endDate)) {
          dates.push({
            id: i++,
            date: now.toDate(),
            showMore: false
          });
          now.add(1, 'days');
        }
        return dates;
      };
      this.monthlyDates = enumerateDaysBetweenDates(tomorrow, monthLater)
    },
    generateTimeSlots() {
      const startTime = this.$moment(this.doctor.start_time, "HH:mm")
      const endTime = this.$moment(this.doctor.end_time, "HH:mm")
      const diffInMinutes = endTime.diff(startTime, 'minutes')
      const slotMinute = 30
      for (let i = 0;i <= diffInMinutes;i += slotMinute) {
        const time = startTime.add(slotMinute, 'minutes')
        this.timeSlots.push({
          id: i,
          timeFormatted: time.format('HH:mm'),
          time: time
        })
      }
    },
    monthlyDatesSlot(){
      // Assume generateTimeSlots and monthlyDates are methods in your component
      this.monthlyDates = this.monthlyDates.map(day => {
        return {
          ...day,
          timeSlots: JSON.parse(JSON.stringify(this.timeSlots))
        };
      });
    },
    setDay(day) {
      this.selectedDay = day.date
    },
    setSelectedTime(day, time) {
      this.setDay(day)
      this.selectedTime = time.timeFormatted
      // console.log(this.selectedDay)
    },
    showMoreTimeSlots(day, showState = true) {
      const dayIndex = this.monthlyDates.findIndex(date => date.id === day.id)
      this.monthlyDates[dayIndex].showMore = showState
    }
  },
}
</script>
<style lang="scss" scoped>
@import "assets/Scss/Doctor";
</style>
<style lang="scss">
@import "assets/Scss/Global";
</style>


