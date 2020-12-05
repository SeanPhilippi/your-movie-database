module.exports = movieIds => [
  {
    $match: {
      items: {
        $elemMatch: {
          id: {
            $in: movieIds,
          },
        },
      },
    },
  },
  {
    $project: {
      username: '$username',
      matchingItems: {
        $map: {
          input: {
            $filter: {
              input: '$items',
              as: 'item',
              cond: {
                $in: ['$$item.id', movieIds],
              },
            },
          },
          as: 'item',
          in: {
            id: '$$item.id',
            idx: { $indexOfArray: ['$items.id', '$$item.id'] },
            idxInComparedList: { $indexOfArray: [movieIds, '$$item.id'] },
          },
        },
      },
      numberOfMatches: {
        $size: {
          $filter: {
            input: '$items',
            as: 'item',
            cond: {
              $in: ['$$item.id', movieIds],
            },
          },
        },
      },
    },
  },
  {
    $sort: {
      numberOfMatches: -1,
    },
  },
  {
    $limit: 15,
  },
];
