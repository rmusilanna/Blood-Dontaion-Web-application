
module.exports = ({ id, name }) => {
    return `
        <html>

            <body>

                <div style="text-align: center">
                    <h3>Donor cancelled the donation</h3>
                    <div>
                        Donor <strong>${name}</strong> had to cancel your request with id ${id}
                        
                    </div>
                    We regret the inconvenience.

                    <div>
                            Click <a href="https://bdonationapp.herokuapp.com/track">here</a> to donate.
                    </div>
                </div>


            </body>

        </html>
    
    `;
};
