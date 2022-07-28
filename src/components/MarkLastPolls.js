function MarkLastPolls(polls) {

    // Get list of companies

    let companies = polls.map(poll => poll.company);
    companies = [...new Set(companies)];

    // Mark them with the LAST attribute

    for (let company of companies) {
        let pidx = polls.findIndex(x => x.company === company);
        if (pidx > -1) {(polls[pidx]).last = true}
    }

    polls = polls.filter(x => x.last);

    return(polls);

}

export default MarkLastPolls