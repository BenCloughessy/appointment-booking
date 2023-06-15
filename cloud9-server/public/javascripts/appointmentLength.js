const appointmentLength = (type) => {

    const parsedType = JSON.parse(type)

    const service = parsedType.service
    const addons = parsedType.addons
    const facialWaxingOptions = parsedType.facialWaxingOptions

    console.log("APPT LENGTH PARAMS",service,addons,facialWaxingOptions)

    // Define service lengths
    const serviceLengths = {
        "Facial Strips": 0,
        // Half hour services
        "Dermaplane": 30,
        "Microdermabrasion": 30,
        "LED Light Session": 30,
        "High Frequency": 30,
        "Carboxy Mask": 30,
        "Lash Tint": 30,
        "Brow Tint": 30,
        "Chest Strip": 30,
        "Underarms": 30,
        "Bootie Strip": 30,
        "Stomach Strip": 30,
    
        // Full hour services
        "Welcome Facial": 60,
        "Consultation": 60,
        "Sensitive/ Rosacea Facial": 60,
        "Pigment/ Brightening Facial": 60,
        "Anti-Aging Facial": 60,
        "Dry/Dehydrated Condition Facial": 60,
        "Acneic Facial": 60,
        "Active Acne Facial": 60,
        "Maintenance + Balancing Facial": 60,
        "Lash Lift": 60,
        "Brow Lamination": 60,
        "Partial Back": 60,
        "Full Arm": 60,
        "Just Bikini": 60,
    
        // Hour and a half services
        "Lash Lift and Tint": 90,
        "Brow Lamination and Tint": 90,
        "Full Back": 90,
        "Full Chest": 90,
        "Full \"BRAZILLY\"": 90,
        "Total \"BRAZILLY and BOOTIE STRIP\"": 90
    }
    
    // Define addon lengths
    const addonLengths = {
        // Facial addons
        "Dermaplane": 30,
        "Microdermabrasion": 30,
        "LED Light Session": 30,
        "High Frequency": 30,
        "Carboxy Mask": 30,
        // Brow addons
        "Shape-Up + Brow-Mapping": 15
    }

    // Define facial waxing lengths
    const facialWaxingOptionLengths = {
        "Eyebrow": 30,
        "Upper Lip": 30,
        "Lower Lip": 30,
        "Cheeks": 30,
        "Nose": 30,
        "Ears": 30,
        "Chin Strap": 30,
        "Sideburns": 30
    }    

    // Calculate appointment length
    calcApptLength = (serviceLengths, addonLengths, facialWaxingOptionLengths) => {
        let appointmentLength = 0
        // Add service length
        if (service) {
            appointmentLength += serviceLengths[service]
        }
        // Add addon length, right now only one addon per service is permitted
        if (addons.length > 0) {
            appointmentLength += addonLengths[addons]
        }
        // Add facial waxing option length
        if (facialWaxingOptions.length > 0) {
            for (let i = 0; i < facialWaxingOptions.length; i++) {
                appointmentLength += facialWaxingOptionLengths[facialWaxingOptions[i]]
            }
        }
        return appointmentLength
    }

    return calcApptLength(serviceLengths, addonLengths, facialWaxingOptionLengths)
}

module.exports = { appointmentLength }