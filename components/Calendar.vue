<template>
  <div class="container">

      <div v-for="day in monthlyDates" :key="moment(day.date).format('MMM DD')" class="slide-content">
        <div :class="{ 'bg-success text-white': selectedDay === day.date }" class="day-container"
             @click="setDay(day.date)">
          {{ moment(day.date).format('MMM DD') }}
        </div>
        <div class="time-slots mt-4 ">
          <div v-for="(timeSlot, index) in day.timeSlots">
            <div v-if="index < 4 && !day.showMore"
                 :class="{ 'bg-success text-white': selectedTime === timeSlot.timeFormatted && selectedDay === day.date }"
                 class="time-slot"
                 @click="setSelectedTime(day, timeSlot)">
              {{ timeSlot.timeFormatted }}
            </div>
            <div v-if="day.showMore"
                 :class="{ 'bg-success text-white': selectedTime === timeSlot.timeFormatted && selectedDay === day.date }"
                 class="time-slot"
                 @click="setSelectedTime(day, timeSlot)">
              {{ timeSlot.timeFormatted }}
            </div>
          </div>
          <div v-show="!day.showMore" class="time-slot slot-more" @click="showMoreTimeSlots(day)">daha çox
          </div>
          <div v-show="day.showMore" class="time-slot slot-more" @click="showMoreTimeSlots(day, false)">daha
            az
          </div>
        </div>
      </div>

    <div class="text-center mt-2 randevu-take">
      <button :class="{ 'text-white': !dateTimeSelected }" :data-bs-target="'#takeAppointmentModal' + doctor.id"
              :disabled="!dateTimeSelected"
              class="btn btn-success d-md-block col-11 my-3 mx-auto" data-bs-backdrop="static"
              data-bs-keyboard="false" data-bs-toggle="modal"
              @click="$emit('dateSelected', { date: selectedDay, time: selectedTime, doctor: doctor })">
        Randevu al
      </button>
    </div>

  </div>
</template>

<script>
import 'moment/locale/az';
import moment from 'moment'
import SsrCarousel from 'vue-ssr-carousel'
import 'vue-ssr-carousel/index.css'

export default {
  name: 'Calendar',
  components: {SsrCarousel,},
  emit: ['day', 'time',],
  props: {
    doctor: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      selectedDay: null,//moment().toDate().toISOString(),
      selectedTime: '',
      selectedHeader: 'location',
      selectedBox: 'clinic',
      monthlyDates: [],
      timeSlots: [],
      appointmentDate: null,
      selectedDate: null,
      moment,
      result: '',
    };
  },
  computed: {
    dateTimeSelected() {
      return this.selectedDay && this.selectedTime
    }
  },
  mounted() {
    // this.moment.locale('az')
    this.user()
    // this.generateTimeSlots()
    this.generateDays()
    // this.myModal = new bootstrap.Modal(document.getElementById('takeAppointmentModal'))
    // console.log(this.profession)
  },

  methods: {
    // createAppointment() {
    //     this.form.doctor_id = this.doctor.id
    //     this.form.date = moment(this.selectedDay).format('YYYY-MM-DD HH:mm')
    //     this.form.time = this.selectedTime
    //     axios.post(this.$apiUrl + "/api-appointments/create", this.form)
    //         .then((resp) => {
    //             // console.log(resp)
    //             this.result = resp.data
    //             // this.myModal.hide()
    //         })
    //         .catch(e => console.log(e))
    // },
    generateDays() {
      // todo : 6ci gunleri hekimden yoxlamaq. bazar gunlerini cixarmaq.
      // const today = moment()
      const tomorrow = moment().add(1, 'days');
      const monthLater = moment().add(1, 'month')
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
      const startTime = moment(this.doctor.start_time, "HH:mm")
      const endTime = moment(this.doctor.end_time, "HH:mm")
      const diffInMinutes = endTime.diff(startTime, 'minutes')
      const slotMinute = 30
      for (let i = 0; i <= diffInMinutes; i += slotMinute) {
        const time = startTime.add(slotMinute, 'minutes')
        this.timeSlots.push({
          id: i,
          timeFormatted: time.format('HH:mm'),
          time: time
        })
      }
    },
    async user() {
      await this.generateTimeSlots()
      this.monthlyDates = this.monthlyDates.map(day => {
        return {
          ...day,
          timeSlots: JSON.parse(JSON.stringify(this.timeSlots))
        }
      })
    },

    setDay(day) {
      this.selectedDay = day.date
    },
    setSelectedTime(day, time) {

      this.setDay(day)
      this.selectedTime = time.timeFormatted
      // console.log(this.selectedDay)
      // this.$emit('day')
      // this.$emit('time')
    },
    showMoreTimeSlots(day, showState = true) {
      const dayIndex = this.monthlyDates.findIndex(date => date.id === day.id)
      this.monthlyDates[dayIndex].showMore = showState
    }
  },
}
</script>

<style lang="scss" scoped>
#takeAppointmentModal {
  .profile-image {
    height: 100px;
    width: 100px;
    background-size: cover;
    background-position: center top;
  }
}

.slide-content {
  height: 290px;
  overflow-y: auto;
}

.day-container {
  margin: 0 auto;
  width: 64px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  color: #01234B;
  font-weight: bold;
  //border: 1px solid #edf0f4;
  cursor: pointer;
  transition: border-color .15s linear, background-color .15s linear;
  //margin-left: 5px;
  //margin-right: 5px;

}

// .btn-success {
//     --bs-btn-disabled-bg: #08a500;
// }

.time-slots {
  display: flex;
  flex-direction: column;
  align-items: center;

  .time-slot {
    width: 64px;
    height: 36px;
    cursor: pointer;
    text-align: center;
    // display: block;
    border-radius: 8px;
    background-color: #72D86D;
    border: 1px solid #edf0f4;
    color: #01234B;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -.1px;
    font-weight: bold;
    transition: background-color .15s linear, color .15s linear, border-color .15s linear;
    padding: 9px 3px;
    margin-bottom: 10px;

    &.slot-more {
      font-size: 10px;
    }
  }
}

// .VueCarousel-inner {
//   visibility: visible !important;
//   transform: translate(0px, 0px);
//   transition: transform 0.5s ease 0s;
//   flex-basis: 110.5px !important;
//   height: auto !important;
// }

.VueCarousel-slide {
  border-right: 1px solid #EDF1F7;
}

.VueCarousel-navigation-button {
  top: 20px;
}

.VueCarousel-navigation-prev {
  &:before {
    content: url(@/assets/icons/arrow-ios-left.svg);
    height: 20px;
    width: 20px;
  }
}

.VueCarousel-navigation-next {
  &:before {
    content: url(@/assets/icons/arrow-ios-right.svg);
    height: 20px;
    width: 20px;
  }
}

@media screen and (max-width: 576px) {
  .slide-content {
    height: 181px;
    overflow-y: auto;
  }

  .randevu-take {
    margin-top: 0 !important;

  }

  .btn-success {
    margin-top: 7px !important;
  }

  .time-slots {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0 !important;

    .time-slot {
      width: 56px;
      height: 26px;
      cursor: pointer;
      text-align: center;
      // display: block;
      border-radius: 6px;
      background-color: #edf0f4;
      border: 1px solid #edf0f4;
      color: #01234B;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -.1px;
      font-weight: bold;
      transition: background-color .15s linear, color .15s linear, border-color .15s linear;
      padding: 3px 3px;
      margin-bottom: 3px;

      &.slot-more {
        font-size: 10px;
      }
    }
  }

  .day-container {
    margin-bottom: 4px;
    width: 56px;
    height: 24px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 6px;
    color: #01234B;
    font-weight: bold;
    cursor: pointer;
    transition: border-color 0.15s linear, background-color 0.15s linear;
  }

}
</style>
