import { Router } from "express";
import moment from "moment";

const router = Router();

router.get('/calendar/:year/:month', function (req, res) {
    const { year, month } = req.params;
    let numericMonth = month;

    // Convertir el nombre del mes a número si es necesario
    if (isNaN(parseInt(month))) {
        numericMonth = moment().month(month).format('M');
    }

    // Obtener el primer día del mes
    const firstDayOfMonth = moment(`${year}-${numericMonth}-01`, 'YYYY-MM-DD').day();

    // Calcular el número de días en el mes
    const daysInMonth = moment(`${year}-${numericMonth}`, 'YYYY-MM').daysInMonth();

    // Crear una matriz para almacenar los días del mes
    const days = [];
    let currentWeek = [];

    // Agregar días vacíos para completar los días de la semana antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
        currentWeek.push("");
    }

    // Generar días del mes
    for (let i = 1; i <= daysInMonth; i++) {
        currentWeek.push(i);
        // Si el día actual es sábado (6), agregamos la semana al array de días y reiniciamos la semana
        if (moment(`${year}-${numericMonth}-${i}`, 'YYYY-MM-DD').day() === 6 || i === daysInMonth) {
            days.push([...currentWeek]);
            currentWeek = [];
        }
    }

    // Renderizar la vista del calendario con los datos proporcionados
    res.render('calendar', { days, year, month });
});


router.get('/calendar/:year', function (req, res) {
    const { year } = req.params;

    // Generar datos para mostrar todos los meses del año
    const monthsData = [];
    for (let month = 1; month <= 12; month++) {
        const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();

        const firstDayOfMonth = moment(`${year}-${month}-01`, 'YYYY-MM-DD').day();
        const days = [];
        let currentWeek = [];

        // Agregar días vacíos para completar los días de la semana antes del primer día del mes
        for (let i = 0; i < firstDayOfMonth; i++) {
            currentWeek.push("");
        }

        // Generar días del mes
        for (let i = 1; i <= daysInMonth; i++) {
            currentWeek.push(i);
            // Si el día actual es sábado (6), agregamos la semana al array de días y reiniciamos la semana
            if (moment(`${year}-${month}-${i}`, 'YYYY-MM-DD').day() === 6 || i === daysInMonth) {
                days.push([...currentWeek]);
                currentWeek = [];
            }
        }

        monthsData.push({
            month: moment.months()[month - 1], // Obtener el nombre del mes
            days: days
        });
    }

    // Renderizar la vista de calendario anual con los datos generados
    res.render('yearlyCalendar', { year, monthsData });
});

router.get('/calendar/:year/:month/:days', function (req, res) {
    const { year, month, days } = req.params;

    

    const date = moment(`${year}-${month}-${days}`, 'YYYY-MM-DD');
    const realDay = date.format("MMMM DD, YYYY");
    // Verificar si la fecha es válida
    if (!date.isValid()) {
        return res.status(400).send('Invalid date');
    }

    // Renderizar la vista con el día especificado
    res.render('dayView', { year, month, days });
});


export default router;