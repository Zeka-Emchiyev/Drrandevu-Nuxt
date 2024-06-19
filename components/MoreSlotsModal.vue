<template>
    <div class="modal fade" id="appointmentSlotsMoreModal" tabindex="-1" aria-labelledby="appointmentSlotsMoreModalLabel"
         aria-hidden="hidden">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="appointmentSlotsMoreModalLabel">Randevu saatları</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body px-0">
                    <div class="profile-section px-4">
                        <div v-if="doctor" class="row">
                            <div class="col-3">
                                <div class="rounded-circle border profile-image"
                                     :style="{'background-image': 'url(' + $config.apiUrl + '/'+ doctor.profile_photo + ')'}">
                                </div>
                                <router-link class="text-decoration-none profile-link" @click.native="closeModal"
                                             :to="{ name: 'doctor', params: { slug: doctor.slug } }">
                                            Profilə bax
                                </router-link>
                            </div>
                            <div class="col-9">
                                <router-link class="text-decoration-none rout-link" @click.native="closeModal"
                                             :to="{ name: 'doctor', params: { slug: doctor.slug } }">
                                    {{ doctor.fullname }}
                                </router-link>
                                <span class="text-profession" style="display: block;">{{doctor.profession}}</span>
                                <span class="city mb-1">{{ doctor.address }} </span>
                                <span class="city fw-bold">{{ doctor.clinic }}</span>
                                <i class="bi bi-shield-check icon-ins pe-1"></i>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex flex-column days-container justify-content-end px-4 mt-3">
                        <div v-for="day in monthlyDates" :key="$moment(day.date).format('MMM DD')" class="w-100 mb-2">
                            <div>
                                {{ $moment(day.date).format('dddd, DD MMMM') }}
                                <div class="time-slots mt-2 d-flex flex-wrap">
                                    <div v-for="timeSlot in day.timeSlots">
                                        <div class="time-slot"
                                             :class="{ 'bg-success text-white': selectedTime === timeSlot.timeFormatted && selectedDay === day.date }"
                                             @click="setSelectedTime(day, timeSlot)">
                                            {{ timeSlot.timeFormatted }}
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
</template>

<script>
import {isSunday, isWeekend} from "@/helper/util";

export default {
  name: 'MoreSlotsModal',
  emit: ['day', 'time',],
  props: {
    doctor: {
      type: Object,
      default: () => { }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedDay: null,//$moment().toDate().toISOString(),
      selectedTime: '',
      selectedHeader: 'location',
      selectedBox: 'clinic',
      monthlyDates: [],
      timeSlots: [],
      appointmentDate: null,
      selectedDate: null,
      result: '',
      appointmentModal: null
    };
  },
  computed: {
    dateTimeSelected() {
      return this.selectedDay && this.selectedTime
    }
  },
  mounted() {
      this.showMoreModalInput = new bootstrap.Modal(document.getElementById('appointmentSlotsMoreModal'), { backdrop: 'static', keyboard: false });
      document.getElementById('appointmentSlotsMoreModal').addEventListener('hidden.bs.modal',  () => {
          this.$emit("closeModal");
      })
  },

  watch: {
      show(value) {
          if (value) {
              this.showModal();
          }
      }
  },
  methods: {
    showModal() {
      this.showMoreModalInput.show();
      this.user();
      this.generateDays();
    },
    closeModal() {
      this.showMoreModalInput.hide();
    },
    generateDays() {
      const worksOnSaturday = !!this.doctor.saturdayStatus
      const addDayCount = 1;
      let tomorrow = this.$moment().add(1, 'days');
      let monthLater = this.$moment().add(1, 'month');

      if (worksOnSaturday) {
        if (isSunday(tomorrow)) {
          tomorrow = this.$moment().add(addDayCount + 1, 'days');
        }
      }
      // Hekim 6ci gun ishleyirse
      else {
        if (isWeekend(tomorrow)) {
          tomorrow = this.$moment().add(addDayCount + 2, 'days');
        }
      }
      let enumerateDaysBetweenDates = (startDate, endDate) => {
        let now = startDate.clone(), dates = [];
        let i = 0;
        while (now.isSameOrBefore(endDate)) {
          i++
          if (worksOnSaturday) {
            if (!isSunday(now)) {
              dates.push({
                id: i,
                date: now.toDate(),
                showMore: false
              });
            }
          } else {
            if (!isWeekend(now)) {
              dates.push({
                id: i,
                date: now.toDate(),
                showMore: false
              });
            }
          }
          now.add(1, 'days');
        }
        /*while (now.isSameOrBefore(endDate)) {
          dates.push({
            id: i++,
            date: now.toDate(),
            showMore: false
          });
          now.add(1, 'days');
        }*/
        return dates;
      };
      this.monthlyDates = enumerateDaysBetweenDates(tomorrow, monthLater)
    },
    generateTimeSlots() {
        this.timeSlots = []
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
      this.selectedDay = day.date;
    },
    setSelectedTime(day, time) {

      this.setDay(day)
      this.selectedTime = time.timeFormatted
      this.$emit('dateSelected', { date: this.selectedDay, time: this.selectedTime, doctor: this.doctor })
      this.closeModal();
    },
    showMoreTimeSlots(day, showState = true) {
      const dayIndex = this.monthlyDates.findIndex(date => date.id === day.id)
      this.monthlyDates[dayIndex].showMore = showState
    }
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 550px;
  }
}
.profile-section {
  border-bottom: 1px solid #D9D9D9;
  padding-bottom: 20px;
  padding-top: 20px;
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

.time-slots {
  .time-slot {
    width: 66px;
    height: 31px;
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
    padding: 5px 3px;
    margin-bottom: 10px;
    margin-right: 8px;

    &.slot-more {
      font-size: 10px;
    }
  }
}

.more-text {
  color: #0072DB;
  cursor: pointer;
}

@media screen and (max-width: 576px) {
  .slide-content {
    height: 181px;
    overflow-y: auto;
  }
    .modal.fade .modal-dialog {
        transform: translate(0, -14px);
    }

  .randevu-take {
    margin-top: 0 !important;

  }

  .btn-success {
    margin-top: 7px !important;
  }

  .time-slots {
    margin-top: 0 !important;

    .time-slot {
      width: 66px;
      height: 34px;
      cursor: pointer;
      text-align: center;
      border-radius: 6px;
      border: 1px solid #edf0f4;
      color: #01234B;
      font-size: 14px;
      line-height: 28px;
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
.profile-image {
  width: 104px;
  height: 104px;
  background-size: cover;
  background-position: center top;
}
.rout-link {
  color: #01234B;
  font-weight: 600;
  font-size: 24px;
}

.profile-link {
  color: #0072DB;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding-left: 6px;
}

.text-profession {
  color: #01234B;
  font-size: 16px;
  font-weight: 500;
}

@media screen and (max-width: 576px) {
  .profile-image {
    width: 75px;
    height: 75px;
    font-weight: 400;
    line-height: 17px;
  }
  .rout-link {
    color: #01234B;
    font-size: 16px;
  }

  .profile-link {
    color: #0072DB;
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    display: block;
    margin-top: 5px;
    white-space: nowrap;
  }
}
</style>
