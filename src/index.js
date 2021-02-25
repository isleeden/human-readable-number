module.exports = function toReadable(number) {
    let result = [];
    const numbers = {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine",
            0: "",
        },
        tenplus = {
            1: "eleven",
            2: "twelve",
            3: "thirteen",
            4: "fourteen",
            5: "fifteen",
            6: "sixteen",
            7: "seventeen",
            8: "eighteen",
            9: "nineteen",
            0: "",
        },
        dozens = {
            2: "twenty",
            3: "thirty",
            4: "forty",
            5: "fifty",
            6: "sixty",
            7: "seventy",
            8: "eighty",
            9: "ninety",
            0: "",
        };

    function unitStr(n) {
        return numbers[n];
    }

    function dozenStr(n1, n2) {
        if (n1 === "1" && n2 === "0") {
            return { data: "ten", type: "tenplus" };
        } else if (n1 === "1") {
            return { data: tenplus[n2], type: "tenplus" };
        } else {
            return { data: dozens[n1], type: "dozens" };
        }
    }

    function hundredStr(n) {
        return numbers[n] + " hundred";
    }

    function unitsHandler(n, array) {
        const unit = unitStr(n);
        if (unit !== "") {
            result.push(unit);
        }
    }

    function dozensHandler(n1, n2) {
        let { data, type } = dozenStr(n1, n2);
        if (data !== "") {
            if (type === "tenplus") {
                result.push(data);
            } else if (type === "dozens") {
                result.push(data);
                unitsHandler(n2);
            }
        } else {
            unitsHandler(n2);
        }
    }

    const array = String(number).split("");

    if (array.length === 3) {
        result.push(hundredStr(array[0]));
        dozensHandler(array[1], array[2]);
    }

    if (array.length == 2) {
        dozensHandler(array[0], array[1]);
    }

    if (array.length == 1) {
        if (array[0] === "0") {
            result.push("zero");
        } else {
            unitsHandler(array[0]);
        }
    }

    return result.join(" ").trim();
};
