<template>
  <div>
    <!-- Toolbar -->
    <v-sheet class="d-flex" height="54" tile>
      <v-select
        v-model="type"
        :items="types"
        class="ma-2"
        density="compact"
        label="View Mode"
        variant="outlined"
        hide-details
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        class="ma-2"
        density="compact"
        label="Weekdays"
        variant="outlined"
        hide-details
      ></v-select>
    </v-sheet>

    <!-- Calendar -->
    <v-sheet class="calendar-wrapper">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
        :event-color="getEventColor"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    type: "month",
    types: ["month", "week", "day"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { title: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { title: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { title: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { title: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: [new Date()],
    events: [], // will be filled dynamically
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),

  methods: {
    // Method to add new task dynamically
    addTaskToCalendar(title, date) {
      this.events.push({
        title: title,
        start: new Date(date),
        end: new Date(date),
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        allDay: true,
      });
    },

    getEventColor(event) {
      return event.color;
    },
  },
};
</script>
<style scoped>
.calendar-wrapper {
  max-height: 550px; /* choose how tall you want the visible area */
  overflow-y: auto; /* enable vertical scrolling */
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 4px;
}

.calendar-wrapper::-webkit-scrollbar {
  width: 6px;
}
.calendar-wrapper::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.v-calendar {
  font-size: 0.7rem;
}

.v-calendar-month__day {
  min-height: 70px !important; /* taller so all rows are visible */
  padding: 2px !important;
}

.v-calendar-weekdays {
  font-size: 0.65rem !important;
  height: 24px !important;
}

.v-event {
  font-size: 0.55rem !important;
  padding: 1px 2px !important;
}
</style>
