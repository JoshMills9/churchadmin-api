const parsePhoneNumberFromString = require('libphonenumber-js')



const generateOtp = (req, res, next) => {
    const {phoneNumber, churchName} = req.body

    if (!phoneNumber) {
        return res.json({ error: 'Phone number is required' }, { status: 400 });
      }

    const formatPhone = (raw) => {
        const phone = parsePhoneNumberFromString(raw, 'GH');
        return phone?.isValid() ? phone.format('E.164') : null;
      };

    if (formatPhone(phoneNumber)) {
        // Generate a 5-digit code
     const code = Math.floor(10000 + Math.random() * 90000);
     const number = (formatPhone(phoneNumber))

     const value = {
        code,
        number,
        churchName
      }
      res.status(200).json(value)
    }

} 


exports.generateOtp = generateOtp;