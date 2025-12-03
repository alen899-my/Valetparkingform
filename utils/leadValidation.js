import { z } from "zod";

export const leadSchema = z.object({
  // STEP 1
  location_name: z.string().min(3, "Location name is required"),
  parking_capacity: z.string().min(1, "Capacity is required"),
  avg_wait_time: z.string().optional(),
  google_maps_url: z.string().url().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  operation_timing: z.string().optional(),
  location_trn_address: z.string().optional(),

  // STEP 2
  lobbies_count: z.string().optional(),
  key_rooms_count: z.string().optional(),
  lobby_keyroom_distance: z.string().optional(),
  supervisor_required: z.string().optional(),
  ticket_validation_user: z.string().optional(),
  report_user: z.string().optional(),

  // STEP 3
  ticket_type: z.string().optional(),
  fee_type: z.string().optional(),
  ticket_price_details: z.string().optional(),
  vat_type: z.string().optional(),

  // STEP 4
  drivers_count: z.string().optional(),
  drivers_list: z.string().optional(),

  // STEP 5
  superadmin_name: z.string().min(2, "Name required"),
  superadmin_email: z.string().email("Valid email required"),
  superadmin_phone: z.string().min(5, "Phone required"),
  superadmin_training: z.string().optional(),

  // STEP 6
  document_sharing_note: z.string().optional(),
});
