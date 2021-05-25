const moment = require("moment");

module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format);
    },
    truncate: function(str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = new_str.length > 0 ? new_str : str.substr(0, len);
            return new_str + "...";
        }
        return str;
    },
    editButton: function(bookUser, loggedUser, bookId, floating = true) {
        if (bookUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/books/edit/${bookId}" class="btn btn-info "><i class="fas fa-edit fa-small"></i></a>`;
            } else {
                return `<a href="/books/edit/${bookId}"><i class="fas fa-edit"></i></a>`;
            }
        } else {
            return "";
        }
    },
    select: function(selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp(">" + selected + "</option>"),
                ' selected="selected"$&'
            );
    },
    stars: function(rating) {

        ratingsum = 0;
        const icon = "<i class=\"fas fa-star\"></i>"
        const halficon = "<i class=\"fas fa-star-half-alt\"></i>"
        for (let j = 0; j < rating.length; j++) {
            ratingsum = ratingsum + rating[j].ratingValue
        }
        const avgrating = (ratingsum / rating.length).toFixed(3);
        let iconString = "";
        for (let i = 0; i < Math.floor(avgrating); i++) {
            iconString = iconString.concat(icon)
        }
        if (avgrating - Math.floor(avgrating) >= 0.5) {
            iconString = iconString.concat(halficon)
        }
        return iconString;
    }
};