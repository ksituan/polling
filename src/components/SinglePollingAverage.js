function SinglePollingAverage(polls, endDate, parties) {

  // Weight polls relative to end date

  let weightedPolls = polls.map(
    function (poll) {
      poll.weight = 0.95**((endDate-new Date(poll.field))/(24*60*60*1000));
      return(poll);
    }
  );

  // Get a list of all parties

  let partyList = polls.map(poll => poll.poll.map(event => event.party)).flat();
  partyList = new Set(partyList);
  partyList.delete("Others") // Drop others

  let shitlist = ['AIP', 'PVQ', 'GPA']
  shitlist.map(party => partyList.delete(party));

  partyList = [...partyList]

  // Make sure none of the parties have ended their existence

  partyList = partyList.filter(party => new Date(parties[party].end) > endDate || !parties[party].end);

  // Now generate the averages for all of them

  let pollingAverage = partyList.map(
    function (party) {
      let partyPolls = weightedPolls.filter(x => x.poll.map(x => x.party).includes(party));
      partyPolls = partyPolls.map(poll => {poll.value = poll.poll.filter(x => x.party === party)[0].score; return(poll)});
      let weightSum = partyPolls.reduce((a, b) => a + b.weight, 0);
      let avg = partyPolls.map(poll => poll.value*(poll.weight/weightSum));
      avg = avg.reduce((x, y) => x + y, 0);
      avg = Math.round(avg*10)/10
      return({party: party, score: avg})
    }
  )

  pollingAverage = pollingAverage.sort((a, b) => b.score - a.score);

  return(pollingAverage);
}

export default SinglePollingAverage