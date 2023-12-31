// @flow
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import allLocales from '@fullcalendar/core/locales-all'
type CalendarProps = {
    onDateClick: (value: any) => void,
    onEventClick: (value: any) => void,
    onDrop: (value: any) => void,
    events: Array<any>,
};

const Calendar = ({ onDateClick, onEventClick, onDrop, events }: CalendarProps): React$Element<React$FragmentType> => {
    /*
     * handle calendar methods
     */
    const handleDateClick = (arg) => {
        onDateClick(arg);
    };
    const handleEventClick = (arg) => {
        onEventClick(arg);
    };
    const handleDrop = (arg) => {
        onDrop(arg);
    };

    return (
        <>
            {/* full calendar control */}
            <div id="calendar">
                <FullCalendar
                    locales={allLocales} locale={'es'} 
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    buttonText={{
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semanal',
                        day: 'Diario',
                        list: 'Lista',
                        prev: 'Anterior',
                        next: 'Siguiente',
                    }}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    }}
                    editable={true}
                    selectable={true}
                    droppable={true}
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    drop={handleDrop}
                />
            </div>
        </>
    );
};

export default Calendar;
