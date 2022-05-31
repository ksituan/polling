function MarkLastPolls(polls) {

    console.log(polls);

    // Get list of companies

    let companies = polls.map(poll => poll.company);
    companies = [...new Set(companies)];

    console.log(companies);

    // Mark them with the LAST attribute

    for (let company of companies) {
        let pidx = polls.findIndex(x => x.company === company);
        if (pidx > -1) {(polls[pidx]).last = true}
    }

    polls = polls.filter(x => x.last);

    console.log(polls);

    return(polls);

}

export default MarkLastPolls