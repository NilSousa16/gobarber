import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.all();

    return response.json(appointments);
})  

appointmentsRouter.post('/', (request,response) => {
    try {
        const { provider, date } = request.body;

        const parseDate = parseISO(date);
        
        const createAppointment = new CreateAppointmentService(
            appointmentRepository,
        );

        const appointment = createAppointment.execute({ 
            date: parseDate, 
            provider,
        });

        return response.json(appointment);
    } catch (err: any) {
        return response.status(400).json({ error: err.message })
    }
});

export default appointmentsRouter;