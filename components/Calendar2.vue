<template>
    <div class="">
        <div class="d-flex justify-content-between mt-3">
            <div class="d-flex flex-column days-container justify-content-end">
                <div v-for="day in nextTwoDays" :key="moment(day.date).format('MMM DD')" class="w-100 mb-2">
                    <div>
                        <div class="day-date mb-2">
                            {{ moment(day.date).format('dddd, DD MMMM') }}
                        </div>
                        <div class="time-slots mt-2 d-flex flex-wrap justify-content-between">
                            <div v-for="(timeSlot, index) in day.timeSlots">
                                <div v-if="index < 8" class="time-slot"
                                     :class="{
                                      'd-none d-md-block' : index > 3,
                                      'bg-success text-white': selectedTime === timeSlot.timeFormatted && selectedDay === day.date && selectedDoctor.id === doctor.id
                                    }"
                                     @click="setSelectedTime(day, timeSlot)">
                                    {{ timeSlot.timeFormatted }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a v-if="!buttonLink" class="text-end more-text" @click="$emit('showMore', doctor)">Daha çox</a>
            </div>

        </div>
        <button v-if="buttonLink" class="other-days-button w-100" @click="$emit('showMore', doctor)">Digər günlər</button>
    </div>
</template>

<script>
import 'moment/locale/az';
import moment from 'moment'
import {isSunday, isWeekend} from "@/helper/util";

export default {
    name: 'Calendar2',
    emit: ['day', 'time'],
    props: {
        doctor: {
            type: Object,
            default: () => { }
        },
        selectedDoctor: {
          type: Object,
          default: () => { }
        },
        buttonLink: {
            type: Boolean,
            default: () => { }
        },
    },
    data() {
        return {
            selectedDay: null,//moment().toDate().toISOString(),
            selectedTime: '',
            selectedHeader: 'location',
            selectedBox: 'clinic',
            nextTwoDays: [],
            timeSlots: [],
            appointmentDate: null,
            selectedDate: null,
            moment,
            result: '',
            appointmentModal: null,
            showMoreModalInput: null,
            showMore: false,
        };
    },
    computed: {
        dateTimeSelected() {
            return this.selectedDay && this.selectedTime
        }
    },
    mounted() {
        this.moment.locale('az')
        this.user()
        this.generateDays()
    },

    methods: {
        generateDays() {
            const worksOnSaturday = !!this.doctor.saturdayStatus
            const addDayCount = 1;
            let tomorrow = moment().add(addDayCount, 'days');
            let nextTwoDay = moment().add(addDayCount + 1, 'days');
            // Hekim 6ci gun ishleyirse - ancaq bazar gun olan gunleri bypass etmek.
            if (worksOnSaturday) {
              if (isSunday(tomorrow)) {
                tomorrow = moment().add(addDayCount + 1, 'days');
                nextTwoDay = moment().add(addDayCount + 2, 'days');
              }
              if (isSunday(nextTwoDay)) {
                nextTwoDay = moment().add(addDayCount + 2, 'days');
              }
            }
            // Hekim 6ci gun ishleyirse - 6 ve bazari bypass etmek.
            else {
              if (isWeekend(tomorrow)) {
                tomorrow = moment().add(addDayCount + 2, 'days');
                nextTwoDay = moment().add(addDayCount + 3, 'days');
              }
              if (isWeekend(nextTwoDay)) {
                nextTwoDay = moment().add(addDayCount + 3, 'days');
              }
            }
            let enumerateDaysBetweenDates = (startDate, endDate) => {
              let now = startDate.clone(), dates = [];
                // static version for 2 days.
                dates = [
                  {
                    id: 1,
                    date: now.toDate(),
                  },
                  {
                    id: 2,
                    date: endDate.toDate(),
                  }
                ];
                // dynamic version for multiple days.
                /*
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

                }*/
                return dates;
            };
            this.nextTwoDays = enumerateDaysBetweenDates(tomorrow, nextTwoDay)
        },
        generateTimeSlots() {
            const startTime = moment(this.doctor.start_time, "HH:mm")
            const endTime = moment(this.doctor.end_time, "HH:mm")
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
            this.nextTwoDays = this.nextTwoDays.map(day => {
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
            this.$emit('dateSelected', { date: this.selectedDay, time: this.selectedTime, doctor: this.doctor })
        },
    },
}
</script>

<style lang="scss" scoped>
.other-days-button{
    width: 100%;
    max-width: 90%;
    margin-left:10px;
    border: 1px solid #BFBEBE;
    background-color: #fff;
    color: #01234B;
    border-radius: 8px;
    padding:10px 10px ;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 40px;
}
.other-days-button:hover{
    background-color: #01234B;
    color: #fff;

}
.slide-content {
    height: 290px;
    overflow-y: auto;
}
.day-date{
    font-family: Montserrat;
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    color: #01234B;
}
.days-container {
  max-width: 300px;
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
</style>
