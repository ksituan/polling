const jurisdictions = [
  ["BC", "British Columbia"],
  ["AB", "Alberta"],
  ["SK", "Saskatchewan"],
  ["MB", "Manitoba"],
  ["ON", "Ontario"],
  ["QC", "Quebec"],
  ["NB", "New Brunswick"],
  ["PE", "Prince Edward Island"],
  ["NS", "Nova Scotia"],
  ["NL", "Newfoundland and Labrador"],
  ["YT", "Yukon"],
  ["Canada", "Canada"],
  ["Canada_BC", "British Columbia federal"],
  ["Canada_AB", "Alberta federal"],
  ["Canada_SKMB", "Saskatchewan/Manitoba federal"],
  ["Canada_ON", "Ontario federal"],
  ["Canada_QC", "Quebec federal"],
  ["Canada_ATL", "Atlantic federal"],
];

exports.createPages = async ({ actions, cache, graphql }) => {
  const { createPage, createRedirect } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });

  const jurisdictions = [
    ["BC", "British Columbia"],
    ["AB", "Alberta"],
    ["SK", "Saskatchewan"],
    ["MB", "Manitoba"],
    ["ON", "Ontario"],
    ["QC", "Quebec"],
    ["NB", "New Brunswick"],
    ["PE", "Prince Edward Island"],
    ["NS", "Nova Scotia"],
    ["NL", "Newfoundland and Labrador"],
    ["YT", "Yukon"],
    ["Canada", "Federal"],
    ["Canada_BC", "British Columbia federal"],
    ["Canada_AB", "Alberta federal"],
    ["Canada_SKMB", "Saskatchewan/Manitoba federal"],
    ["Canada_ON", "Ontario federal"],
    ["Canada_QC", "Quebec federal"],
    ["Canada_ATL", "Atlantic federal"],
  ];

  let lastElectionIn = {};

  for (let [jurisdiction, jurisdictionName] of jurisdictions) {
    const electionsData = await graphql(`
    query {
      allElectionsJson(
        filter: {jurisdiction: {eq: "${jurisdiction}"}}
        sort: {fields: date}
      ) {
        edges {
          next {
            date
          }
          node {
            date
            year: date(formatString: "YYYY")
          }
        }
      }
    }
    `)
    
    for (let {node, next} of electionsData.data.allElectionsJson.edges) {
      const pagePath = `/${jurisdiction}-${node.year}`
      if (!next) {
        console.log({fromPath: `/${jurisdiction}`, toPath: pagePath});
        createRedirect({fromPath: `/${jurisdiction}`, toPath: pagePath});
        lastElectionIn[jurisdiction] = node.date;
      }

      createPage({
          path: pagePath,
          component: require.resolve("./src/templates/SingleProvince.js"),
          context: { jurisdiction, jurisdictionName, afterDate: node.date, beforeDate: next ? next.date : new Date().toJSON() },
      });
    }

    cache.set("lastElectionIn", lastElectionIn);
  }
};

exports.createResolvers = ({createResolvers}) => {
  const resolvers = {
    Query: {
      recentElectionPolls: {
        type: ["PollsJson"],
        args: {
          jurisdiction: "String!"
        },
        resolve: async (source, args, context, info) => {
          const recentElectionEntries = await context.nodeModel.findAll({
            type: "ElectionsJson",
            query: {
              filter: {
                jurisdiction: { eq: args.jurisdiction }
              },
              sort: {
                order: ["DESC"],
                fields: ["date"],
              },
              limit: 1,
            }
          })

          const lastElectionDate = [...recentElectionEntries.entries][0].date;
          console.log(lastElectionDate);

          const pollsPerElection = await context.nodeModel.findAll({
            type: "PollsJson",
            query: {
              filter: {
                jurisdiction: { eq: args.jurisdiction },
                field: { gte: lastElectionDate }
              },
              sort: {
                order: ["DESC"],
                fields: ["field"],
              }
            }
          })

          return pollsPerElection.entries;
        }
      }
    }
  }

  createResolvers(resolvers);
}