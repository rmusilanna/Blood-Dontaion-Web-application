module.exports = async function (req, res, next) {

    let { city, state, country } = req.body;

    city = (city ? city.toLowerCase() : city).replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    state = (state ? state.toLowerCase() : state).replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    country = (country ? country.toLowerCase() : country).replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });

    req.body.city = city;
    req.body.state = state;
    req.body.country = country;

    next();
};
