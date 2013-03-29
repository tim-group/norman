#!/usr/bin/env perl
use  strict;
use warnings;
use lib '/opt/message-passing/lib/perl5/';
use JSON qw/ encode_json to_json /;
use Data::GUID;

use ElasticSearch;

my $es = ElasticSearch->new( servers => 'localhost:9200' );
$es->trace_calls(1); 
my $results = $es->search(
  index => 'logstash-2013.03.29',
  type  => 'puppet-apply',
  query => {
        "term" => { '@tags' => "puppet-apply" }
  }
);
use Data::Dumper;

#warn Dumper($results);

my @data = map { $_->{_source} } @{ $results->{hits}{hits} };

system("rm -r /tmp/test_data; mkdir /tmp/test_data");
foreach my $datum (@data) {
    $datum->{'@uuid'} = Data::GUID->new()->as_string;
    open(my $fh, '>', "/tmp/test_data/" . $datum->{'@uuid'} . ".json") or die;
    print $fh to_json($datum, {utf8 => 1, pretty => 1}) . "\n";
    close($fh);
}
open(my $fh, '>', "/tmp/test_data/reports_latest.json") or die;
print $fh to_json(\@data, {utf8 => 1, pretty => 1}) . "\n";
close($fh);


