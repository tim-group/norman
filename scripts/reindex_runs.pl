#!/usr/bin/env perl
use  strict;
use warnings;
use lib '/opt/message-passing/lib/perl5/';
use JSON qw/ encode_json to_json from_json /;
use FindBin qw/ $Bin /;

use ElasticSearch;
open(my $fh, '<', "$Bin/../app/data/reports_latest.json");
my $data = from_json(do { local $/; local $\; <$fh> });
my $es = ElasticSearch->new( servers => 'localhost:9200' );
#$es->trace_calls(1); 
foreach my $datum (@$data) {
  $es->index(
    index => 'logstash-2013.03.29',
    type  => 'puppet-apply',
    id => $datum->{'@uuid'},
    data => $datum,
  );
}


